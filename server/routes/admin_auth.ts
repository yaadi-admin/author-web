import crypto from "node:crypto";
import type { RequestHandler } from "express";
import type { AdminLoginRequest, AdminSessionResponse } from "@shared/api";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 120 * 60 * 1000;

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

export const handleAdminLogin: RequestHandler = (request, response) => {
  try {
    const adminPassword = getAdminPassword();
    const { password } = (request.body ?? {}) as Partial<AdminLoginRequest>;

    if (!adminPassword) {
      const payload: AdminSessionResponse = {
        authenticated: false,
        error: "ADMIN_PASSWORD is not configured.",
      };
      return response.status(500).json(payload);
    }

    if (!password) {
      const payload: AdminSessionResponse = {
        authenticated: false,
        error: "Password is required.",
      };
      return response.status(400).json(payload);
    }

    if (password !== adminPassword) {
      const payload: AdminSessionResponse = {
        authenticated: false,
        error: "Invalid password.",
      };
      return response.status(401).json(payload);
    }

    const expiresAt = Date.now() + SESSION_DURATION_MS;
    const token = createSessionToken(expiresAt);

    response.setHeader(
      "Set-Cookie",
      buildCookie(token, Math.floor(SESSION_DURATION_MS / 1000)),
    );

    const payload: AdminSessionResponse = {
      authenticated: true,
      expiresAt,
    };

    return response.json(payload);
  } catch (error) {
    console.error("Admin login error:", error);
    const payload: AdminSessionResponse = {
      authenticated: false,
      error: "Unable to start admin session.",
    };
    return response.status(500).json(payload);
  }
};

export const handleAdminSession: RequestHandler = (request, response) => {
  const expiresAt = getSessionExpiry(request.headers.cookie);

  if (!expiresAt) {
    response.setHeader("Set-Cookie", clearCookie());

    const payload: AdminSessionResponse = {
      authenticated: false,
    };

    return response.status(401).json(payload);
  }

  const payload: AdminSessionResponse = {
    authenticated: true,
    expiresAt,
  };

  return response.json(payload);
};

export const handleAdminLogout: RequestHandler = (_request, response) => {
  response.setHeader("Set-Cookie", clearCookie());
  return response.json({ success: true });
};
