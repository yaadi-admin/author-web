import crypto from "node:crypto";
import type { AdminLoginRequest, AdminSessionResponse } from "@shared/api";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 120 * 60 * 1000;

export interface JsonResult<T> {
  status: number;
  body: T;
  headers?: Record<string, string>;
}

const readEnv = (name: string) => {
  const value = process.env[name];
  if (typeof value !== "string") {
    return undefined;
  }

  return value === "" ? undefined : value;
};

const getAdminPassword = () => readEnv("ADMIN_PASSWORD");
const getSessionSecret = () =>
  readEnv("ADMIN_SESSION_SECRET") ?? readEnv("ADMIN_PASSWORD");

const parseCookies = (cookieHeader?: string): Record<string, string> => {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(";").reduce<Record<string, string>>((cookies, pair) => {
    const [rawKey, ...rawValue] = pair.trim().split("=");
    if (!rawKey) {
      return cookies;
    }

    cookies[rawKey] = decodeURIComponent(rawValue.join("="));
    return cookies;
  }, {});
};

const signPayload = (payload: string) => {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
};

const createSessionToken = (expiresAt: number): string => {
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt }), "utf8").toString(
    "base64url",
  );
  const signature = signPayload(payload);
  if (!signature) {
    throw new Error("Admin session secret is not configured.");
  }
  return `${payload}.${signature}`;
};

const getSessionExpiry = (cookieHeader?: string): number | null => {
  const token = parseCookies(cookieHeader)[SESSION_COOKIE_NAME];
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(payload);
  if (!expectedSignature) {
    return null;
  }
  if (signature.length !== expectedSignature.length) {
    return null;
  }

  const isValidSignature = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );

  if (!isValidSignature) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: number };

    if (typeof decoded.exp !== "number" || decoded.exp <= Date.now()) {
      return null;
    }

    return decoded.exp;
  } catch {
    return null;
  }
};

const buildCookie = (token: string, maxAgeSeconds: number) =>
  [
    `${SESSION_COOKIE_NAME}=${token}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${maxAgeSeconds}`,
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

const clearCookie = () =>
  [
    `${SESSION_COOKIE_NAME}=`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    "Max-Age=0",
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

export const loginAdmin = (
  body?: Partial<AdminLoginRequest>,
): JsonResult<AdminSessionResponse> => {
  try {
    const adminPassword = getAdminPassword();
    const password = body?.password;

    if (!adminPassword) {
      return {
        status: 500,
        body: {
          authenticated: false,
          error: "ADMIN_PASSWORD is not configured.",
        },
      };
    }

    if (!password) {
      return {
        status: 400,
        body: {
          authenticated: false,
          error: "Password is required.",
        },
      };
    }

    if (password !== adminPassword) {
      return {
        status: 401,
        body: {
          authenticated: false,
          error: "Invalid password.",
        },
      };
    }

    const expiresAt = Date.now() + SESSION_DURATION_MS;
    const token = createSessionToken(expiresAt);

    return {
      status: 200,
      headers: {
        "Set-Cookie": buildCookie(token, Math.floor(SESSION_DURATION_MS / 1000)),
      },
      body: {
        authenticated: true,
        expiresAt,
      },
    };
  } catch (error) {
    console.error("Admin login error:", error);

    return {
      status: 500,
      body: {
        authenticated: false,
        error: "Unable to start admin session.",
      },
    };
  }
};

export const getAdminSessionResponse = (
  cookieHeader?: string | null,
): JsonResult<AdminSessionResponse> => {
  const expiresAt = getSessionExpiry(cookieHeader ?? undefined);

  if (!expiresAt) {
    return {
      status: 401,
      headers: {
        "Set-Cookie": clearCookie(),
      },
      body: {
        authenticated: false,
      },
    };
  }

  return {
    status: 200,
    body: {
      authenticated: true,
      expiresAt,
    },
  };
};

export const logoutAdmin = (): JsonResult<{ success: true }> => ({
  status: 200,
  headers: {
    "Set-Cookie": clearCookie(),
  },
  body: {
    success: true,
  },
});
