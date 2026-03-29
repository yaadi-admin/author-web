import type { AdminLoginRequest, AdminSessionResponse } from "@shared/api";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 120 * 60 * 1000;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

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

const toBase64 = (bytes: Uint8Array) => {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

const fromBase64 = (value: string) =>
  Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

const toBase64Url = (bytes: Uint8Array) =>
  toBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

const fromBase64Url = (value: string) => {
  const padding = (4 - (value.length % 4 || 4)) % 4;
  const base64 = `${value.replace(/-/g, "+").replace(/_/g, "/")}${"=".repeat(padding)}`;
  return fromBase64(base64);
};

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

const createHmacKey = async (usage: "sign" | "verify") => {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  return globalThis.crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    [usage],
  );
};

const signPayload = async (payload: string) => {
  const key = await createHmacKey("sign");
  if (!key) {
    return null;
  }

  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(payload),
  );

  return toBase64Url(new Uint8Array(signature));
};

const createSessionToken = async (expiresAt: number): Promise<string> => {
  const payload = toBase64Url(textEncoder.encode(JSON.stringify({ exp: expiresAt })));
  const signature = await signPayload(payload);

  if (!signature) {
    throw new Error("Admin session secret is not configured.");
  }

  return `${payload}.${signature}`;
};

const getSessionExpiry = async (cookieHeader?: string): Promise<number | null> => {
  const token = parseCookies(cookieHeader)[SESSION_COOKIE_NAME];
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const key = await createHmacKey("verify");
  if (!key) {
    return null;
  }

  const isValidSignature = await globalThis.crypto.subtle.verify(
    "HMAC",
    key,
    fromBase64Url(signature),
    textEncoder.encode(payload),
  );

  if (!isValidSignature) {
    return null;
  }

  try {
    const decoded = JSON.parse(textDecoder.decode(fromBase64Url(payload))) as {
      exp?: number;
    };

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

export const loginAdmin = async (
  body?: Partial<AdminLoginRequest>,
): Promise<JsonResult<AdminSessionResponse>> => {
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
    const token = await createSessionToken(expiresAt);

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

export const getAdminSessionResponse = async (
  cookieHeader?: string | null,
): Promise<JsonResult<AdminSessionResponse>> => {
  const expiresAt = await getSessionExpiry(cookieHeader ?? undefined);

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
