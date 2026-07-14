// Auto-generated self-contained Vercel handler. Source of truth: server/lib/admin_auth.ts
// Run: node scripts/sync-admin-api.mjs
export interface AdminLoginRequest {
  password: string;
}

export interface AdminSessionResponse {
  authenticated: boolean;
  expiresAt?: number;
  error?: string;
}

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 120 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const SESSION_VERSION = 1;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export interface JsonResult<T> {
  status: number;
  body: T;
  headers?: Record<string, string>;
}

interface SessionPayload {
  v: number;
  role: "admin";
  iat: number;
  exp: number;
  jti: string;
}

interface LoginAttemptState {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, LoginAttemptState>();

/** Test helper — clears in-memory rate-limit state between specs. */
export const resetAdminAuthRateLimitsForTests = () => {
  loginAttempts.clear();
};

const readEnv = (name: string) => {
  const value = process.env[name];
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  // Support quoted env values from local .env files.
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

const getAdminPassword = () => readEnv("ADMIN_PASSWORD");
const getAdminPasswordHash = () => readEnv("ADMIN_PASSWORD_HASH");

const isProduction = () =>
  process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

const toBase64Url = (bytes: Uint8Array) => {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const fromBase64Url = (value: string) => {
  const padding = (4 - (value.length % 4 || 4)) % 4;
  const base64 = `${value.replace(/-/g, "+").replace(/_/g, "/")}${"=".repeat(padding)}`;
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const parseCookies = (cookieHeader?: string): Record<string, string> => {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(";").reduce<Record<string, string>>((cookies, pair) => {
    const trimmed = pair.trim();
    if (!trimmed.includes("=")) {
      return cookies;
    }

    const separator = trimmed.indexOf("=");
    const rawKey = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();
    const reserved = new Set([
      "HttpOnly",
      "Secure",
      "Path",
      "SameSite",
      "Max-Age",
      "Expires",
      "Domain",
    ]);

    if (!rawKey || reserved.has(rawKey)) {
      return cookies;
    }

    try {
      cookies[rawKey] = decodeURIComponent(rawValue);
    } catch {
      cookies[rawKey] = rawValue;
    }

    return cookies;
  }, {});
};

const sha256 = async (value: string) => {
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    textEncoder.encode(value),
  );
  return new Uint8Array(digest);
};

/**
 * Prefer ADMIN_SESSION_SECRET. If unset, derive a dedicated session key so the
 * raw admin password cannot be reused directly as an HMAC/AES key.
 */
const getSessionSecretMaterial = async (): Promise<Uint8Array | null> => {
  const explicit = readEnv("ADMIN_SESSION_SECRET");
  if (explicit) {
    return textEncoder.encode(explicit);
  }

  const password = getAdminPassword();
  const passwordHash = getAdminPasswordHash();
  const site = readEnv("PUBLIC_SITE_URL") ?? "suelynempoweredliving.com";

  if (!password && !passwordHash) {
    return null;
  }

  return sha256(
    `suelyn-admin-session-v${SESSION_VERSION}|${site}|${passwordHash ?? password}`,
  );
};

const importAesKey = async (material: Uint8Array) => {
  const digest = await globalThis.crypto.subtle.digest("SHA-256", material);
  return globalThis.crypto.subtle.importKey(
    "raw",
    digest,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
};

const createSessionToken = async (expiresAt: number): Promise<string> => {
  const material = await getSessionSecretMaterial();
  if (!material) {
    throw new Error("Admin session secret is not configured.");
  }

  const payload: SessionPayload = {
    v: SESSION_VERSION,
    role: "admin",
    iat: Date.now(),
    exp: expiresAt,
    jti: toBase64Url(globalThis.crypto.getRandomValues(new Uint8Array(16))),
  };

  const key = await importAesKey(material);
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await globalThis.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    textEncoder.encode(JSON.stringify(payload)),
  );

  return `${toBase64Url(iv)}.${toBase64Url(new Uint8Array(encrypted))}`;
};

const decryptSessionToken = async (
  token: string,
): Promise<SessionPayload | null> => {
  const [ivPart, cipherPart] = token.split(".");
  if (!ivPart || !cipherPart) {
    return null;
  }

  const material = await getSessionSecretMaterial();
  if (!material) {
    return null;
  }

  try {
    const key = await importAesKey(material);
    const decrypted = await globalThis.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fromBase64Url(ivPart) },
      key,
      fromBase64Url(cipherPart),
    );

    const payload = JSON.parse(textDecoder.decode(decrypted)) as SessionPayload;

    if (
      payload.v !== SESSION_VERSION ||
      payload.role !== "admin" ||
      typeof payload.exp !== "number" ||
      typeof payload.iat !== "number" ||
      typeof payload.jti !== "string" ||
      payload.exp <= Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

const timingSafeEqualStrings = (left: string, right: string): boolean => {
  const leftBytes = textEncoder.encode(left);
  const rightBytes = textEncoder.encode(right);
  const maxLength = Math.max(leftBytes.length, rightBytes.length);
  let mismatch = leftBytes.length === rightBytes.length ? 0 : 1;

  for (let index = 0; index < maxLength; index += 1) {
    const leftValue = leftBytes[index] ?? 0;
    const rightValue = rightBytes[index] ?? 0;
    mismatch |= leftValue ^ rightValue;
  }

  return mismatch === 0;
};

const bytesToHex = (bytes: Uint8Array) =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const hexToBytes = (hex: string) => {
  if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length % 2 !== 0) {
    return null;
  }

  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
};

/**
 * Optional hashed password support:
 * ADMIN_PASSWORD_HASH=pbkdf2$iterations$saltHex$hashHex
 * Existing ADMIN_PASSWORD continues to work unchanged.
 */
const verifyPasswordHash = async (
  password: string,
  encodedHash: string,
): Promise<boolean> => {
  const [scheme, iterationsRaw, saltHex, hashHex] = encodedHash.split("$");
  if (scheme !== "pbkdf2" || !iterationsRaw || !saltHex || !hashHex) {
    return false;
  }

  const iterations = Number(iterationsRaw);
  const salt = hexToBytes(saltHex);
  const expected = hexToBytes(hashHex);

  if (!Number.isFinite(iterations) || iterations < 100000 || !salt || !expected) {
    return false;
  }

  const keyMaterial = await globalThis.crypto.subtle.importKey(
    "raw",
    textEncoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const derivedBits = await globalThis.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations,
    },
    keyMaterial,
    expected.length * 8,
  );

  return timingSafeEqualStrings(bytesToHex(new Uint8Array(derivedBits)), hashHex.toLowerCase());
};

export const verifyAdminPassword = async (password: string): Promise<boolean> => {
  const passwordHash = getAdminPasswordHash();
  if (passwordHash) {
    return verifyPasswordHash(password, passwordHash);
  }

  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    return false;
  }

  return timingSafeEqualStrings(password, adminPassword);
};

const getClientKey = (clientKey?: string) => {
  const normalized = (clientKey || "unknown").trim().toLowerCase();
  return normalized || "unknown";
};

const getAttemptState = (clientKey: string): LoginAttemptState => {
  const existing = loginAttempts.get(clientKey);
  const now = Date.now();

  if (!existing || existing.resetAt <= now) {
    const next = { count: 0, resetAt: now + LOGIN_WINDOW_MS };
    loginAttempts.set(clientKey, next);
    return next;
  }

  return existing;
};

const registerFailedLogin = (clientKey: string) => {
  const state = getAttemptState(clientKey);
  state.count += 1;
  loginAttempts.set(clientKey, state);
  return state;
};

const clearFailedLogins = (clientKey: string) => {
  loginAttempts.delete(clientKey);
};

const isRateLimited = (clientKey: string) => {
  const state = getAttemptState(clientKey);
  return state.count >= MAX_LOGIN_ATTEMPTS;
};

const buildCookie = (token: string, maxAgeSeconds: number) =>
  [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Strict",
    `Max-Age=${maxAgeSeconds}`,
    isProduction() ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

const clearCookie = () =>
  [
    `${SESSION_COOKIE_NAME}=`,
    "HttpOnly",
    "Path=/",
    "SameSite=Strict",
    "Max-Age=0",
    isProduction() ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

const noStoreHeaders = (extra?: Record<string, string>) => ({
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  ...extra,
});

export const getSessionExpiry = async (
  cookieHeader?: string,
): Promise<number | null> => {
  const token = parseCookies(cookieHeader)[SESSION_COOKIE_NAME];
  if (!token) {
    return null;
  }

  const payload = await decryptSessionToken(token);
  return payload?.exp ?? null;
};

export const requireAdminSession = async (
  cookieHeader?: string | null,
): Promise<JsonResult<AdminSessionResponse> | null> => {
  const expiresAt = await getSessionExpiry(cookieHeader ?? undefined);
  if (!expiresAt) {
    return {
      status: 401,
      headers: noStoreHeaders({
        "Set-Cookie": clearCookie(),
      }),
      body: {
        authenticated: false,
        error: "Admin session required.",
      },
    };
  }

  return null;
};

export const loginAdmin = async (
  body?: Partial<AdminLoginRequest>,
  options?: { clientKey?: string },
): Promise<JsonResult<AdminSessionResponse>> => {
  try {
    const clientKey = getClientKey(options?.clientKey);
    const adminPassword = getAdminPassword();
    const adminPasswordHash = getAdminPasswordHash();
    const password = body?.password;

    if (!adminPassword && !adminPasswordHash) {
      return {
        status: 500,
        headers: noStoreHeaders(),
        body: {
          authenticated: false,
          error: "ADMIN_PASSWORD is not configured.",
        },
      };
    }

    if (isRateLimited(clientKey)) {
      const state = getAttemptState(clientKey);
      const retryMinutes = Math.max(
        1,
        Math.ceil((state.resetAt - Date.now()) / 60000),
      );

      return {
        status: 429,
        headers: noStoreHeaders({
          "Retry-After": String(Math.ceil((state.resetAt - Date.now()) / 1000)),
        }),
        body: {
          authenticated: false,
          error: `Too many login attempts. Try again in about ${retryMinutes} minute${retryMinutes === 1 ? "" : "s"}.`,
        },
      };
    }

    if (!password) {
      return {
        status: 400,
        headers: noStoreHeaders(),
        body: {
          authenticated: false,
          error: "Password is required.",
        },
      };
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      registerFailedLogin(clientKey);

      return {
        status: 401,
        headers: noStoreHeaders(),
        body: {
          authenticated: false,
          error: "Invalid password.",
        },
      };
    }

    clearFailedLogins(clientKey);

    const expiresAt = Date.now() + SESSION_DURATION_MS;
    const token = await createSessionToken(expiresAt);

    return {
      status: 200,
      headers: noStoreHeaders({
        "Set-Cookie": buildCookie(token, Math.floor(SESSION_DURATION_MS / 1000)),
      }),
      body: {
        authenticated: true,
        expiresAt,
      },
    };
  } catch (error) {
    console.error("Admin login error:", error);

    return {
      status: 500,
      headers: noStoreHeaders(),
      body: {
        authenticated: false,
        error: "Unable to start admin session.",
      },
    };
  }
};

export const getAdminSessionResponse = async (
  cookieHeader?: string | null,
  options?: { renew?: boolean },
): Promise<JsonResult<AdminSessionResponse>> => {
  const expiresAt = await getSessionExpiry(cookieHeader ?? undefined);

  if (!expiresAt) {
    return {
      status: 401,
      headers: noStoreHeaders({
        "Set-Cookie": clearCookie(),
      }),
      body: {
        authenticated: false,
      },
    };
  }

  if (options?.renew) {
    try {
      const nextExpiresAt = Date.now() + SESSION_DURATION_MS;
      const token = await createSessionToken(nextExpiresAt);

      return {
        status: 200,
        headers: noStoreHeaders({
          "Set-Cookie": buildCookie(
            token,
            Math.floor(SESSION_DURATION_MS / 1000),
          ),
        }),
        body: {
          authenticated: true,
          expiresAt: nextExpiresAt,
        },
      };
    } catch (error) {
      console.error("Admin session renew error:", error);
    }
  }

  return {
    status: 200,
    headers: noStoreHeaders(),
    body: {
      authenticated: true,
      expiresAt,
    },
  };
};

export const logoutAdmin = (): JsonResult<{ success: true }> => ({
  status: 200,
  headers: noStoreHeaders({
    "Set-Cookie": clearCookie(),
  }),
  body: {
    success: true,
  },
});

/** Helper for generating ADMIN_PASSWORD_HASH offline / in scripts. */
export const hashAdminPassword = async (
  password: string,
  iterations = 310000,
): Promise<string> => {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await globalThis.crypto.subtle.importKey(
    "raw",
    textEncoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derivedBits = await globalThis.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations,
    },
    keyMaterial,
    256,
  );

  return `pbkdf2$${iterations}$${bytesToHex(salt)}$${bytesToHex(new Uint8Array(derivedBits))}`;
};

const applyLoginResult = <T extends object>(result: {
  status: number;
  body: T;
  headers?: Record<string, string>;
}) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      headers.set(name, value);
    });
  }

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers,
  });
};

const getRequestClientKey = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => undefined)) as
      | { password?: string }
      | undefined;

    const result = await loginAdmin(body, {
      clientKey: getRequestClientKey(request),
    });

    return applyLoginResult(result);
  } catch (error) {
    console.error("Vercel admin login error:", error);

    return applyLoginResult({
      status: 500,
      body: {
        authenticated: false,
        error: "Unable to validate password.",
      },
    });
  }
}
