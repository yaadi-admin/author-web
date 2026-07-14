import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getAdminSessionResponse,
  hashAdminPassword,
  loginAdmin,
  resetAdminAuthRateLimitsForTests,
  verifyAdminPassword,
} from "../lib/admin_auth";

afterEach(() => {
  vi.unstubAllEnvs();
  resetAdminAuthRateLimitsForTests();
});

describe("loginAdmin", () => {
  it("accepts the existing ADMIN_PASSWORD and issues an encrypted session cookie", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "Empowered#2025");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-session-secret");

    const response = await loginAdmin({
      password: "Empowered#2025",
    });

    expect(response.status).toBe(200);
    expect(response.headers?.["Set-Cookie"]).toContain("admin_session=");
    expect(response.headers?.["Set-Cookie"]).toContain("HttpOnly");
    expect(response.headers?.["Set-Cookie"]).toContain("SameSite=Strict");
    expect(response.body).toMatchObject({
      authenticated: true,
    });
  });

  it("falls back to a derived session key when ADMIN_SESSION_SECRET is blank", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");
    vi.stubEnv("PUBLIC_SITE_URL", "https://suelynempoweredliving.com");

    const response = await loginAdmin({
      password: "admin-secret",
    });

    expect(response.status).toBe(200);
    expect(response.headers?.["Set-Cookie"]).toContain("admin_session=");
    expect(response.body).toMatchObject({
      authenticated: true,
    });
  });

  it("returns a JSON error when the password is wrong", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-session-secret");

    const response = await loginAdmin({
      password: "wrong-password",
    });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      authenticated: false,
      error: "Invalid password.",
    });
  });

  it("rate limits repeated failed login attempts", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-session-secret");

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const failed = await loginAdmin(
        { password: "wrong-password" },
        { clientKey: "rate-limit-test" },
      );
      expect(failed.status).toBe(401);
    }

    const blocked = await loginAdmin(
      { password: "admin-secret" },
      { clientKey: "rate-limit-test" },
    );

    expect(blocked.status).toBe(429);
    expect(blocked.body.error).toMatch(/Too many login attempts/i);
  });

  it("accepts a valid cookie from the generated session", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-session-secret");

    const loginResponse = await loginAdmin({
      password: "admin-secret",
    });

    const sessionResponse = await getAdminSessionResponse(
      loginResponse.headers?.["Set-Cookie"],
    );

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body).toMatchObject({
      authenticated: true,
    });
  });

  it("rejects forged cookies", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-session-secret");

    const sessionResponse = await getAdminSessionResponse(
      "admin_session=forged.token.value",
    );

    expect(sessionResponse.status).toBe(401);
    expect(sessionResponse.body).toMatchObject({
      authenticated: false,
    });
  });
});

describe("password hashing", () => {
  it("verifies ADMIN_PASSWORD_HASH without requiring plaintext ADMIN_PASSWORD", async () => {
    const hashed = await hashAdminPassword("Empowered#2025");
    vi.stubEnv("ADMIN_PASSWORD", "");
    vi.stubEnv("ADMIN_PASSWORD_HASH", hashed);
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-session-secret");

    await expect(verifyAdminPassword("Empowered#2025")).resolves.toBe(true);
    await expect(verifyAdminPassword("wrong-password")).resolves.toBe(false);

    const response = await loginAdmin({
      password: "Empowered#2025",
    });

    expect(response.status).toBe(200);
    expect(response.body.authenticated).toBe(true);
  });
});
