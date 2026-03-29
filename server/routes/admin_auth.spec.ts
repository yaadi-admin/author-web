import { afterEach, describe, expect, it, vi } from "vitest";
import { getAdminSessionResponse, loginAdmin } from "../lib/admin_auth";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("loginAdmin", () => {
  it("falls back to ADMIN_PASSWORD when ADMIN_SESSION_SECRET is blank", () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");

    const response = loginAdmin({
      password: "admin-secret",
    });

    expect(response.status).toBe(200);
    expect(response.headers?.["Set-Cookie"]).toContain("admin_session=");
    expect(response.body).toMatchObject({
      authenticated: true,
    });
  });

  it("returns a JSON error when the password is wrong", () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");

    const response = loginAdmin({
      password: "wrong-password",
    });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      authenticated: false,
      error: "Invalid password.",
    });
  });

  it("accepts a valid cookie from the generated session", () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");

    const loginResponse = loginAdmin({
      password: "admin-secret",
    });

    const sessionResponse = getAdminSessionResponse(
      loginResponse.headers?.["Set-Cookie"],
    );

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body).toMatchObject({
      authenticated: true,
    });
  });
});
