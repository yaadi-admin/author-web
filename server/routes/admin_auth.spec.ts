import { afterEach, describe, expect, it, vi } from "vitest";
import { handleAdminLogin } from "./admin_auth";

const createResponse = () => {
  const response = {
    headers: {} as Record<string, string>,
    body: null as unknown,
    statusCode: 200,
    setHeader(name: string, value: string) {
      this.headers[name] = value;
      return this;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };

  return response;
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("handleAdminLogin", () => {
  it("falls back to ADMIN_PASSWORD when ADMIN_SESSION_SECRET is blank", () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");

    const response = createResponse();

    handleAdminLogin(
      {
        body: {
          password: "admin-secret",
        },
      } as never,
      response as never,
      {} as never,
    );

    expect(response.statusCode).toBe(200);
    expect(response.headers["Set-Cookie"]).toContain("admin_session=");
    expect(response.body).toMatchObject({
      authenticated: true,
    });
  });

  it("returns a JSON error when the password is wrong", () => {
    vi.stubEnv("ADMIN_PASSWORD", "admin-secret");
    vi.stubEnv("ADMIN_SESSION_SECRET", "");

    const response = createResponse();

    handleAdminLogin(
      {
        body: {
          password: "wrong-password",
        },
      } as never,
      response as never,
      {} as never,
    );

    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({
      authenticated: false,
      error: "Invalid password.",
    });
  });
});
