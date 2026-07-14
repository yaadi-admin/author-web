import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getAdminSession, loginAdmin, logoutAdmin } from "./admin-auth";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("loginAdmin", () => {
  it("returns the backend JSON error for invalid passwords", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            authenticated: false,
            error: "Invalid password.",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      ),
    );

    await expect(loginAdmin("wrong-password")).rejects.toThrow(
      "Invalid password.",
    );
  });

  it("does not mislabel a server failure as an invalid password", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("<!DOCTYPE html><html><body>Error</body></html>", {
          status: 500,
          headers: {
            "Content-Type": "text/html",
          },
        }),
      ),
    );

    await expect(loginAdmin("correct-password")).rejects.toThrow(
      "Admin login failed on the server.",
    );
  });

  it("sends credentials so the HttpOnly session cookie is stored", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          authenticated: true,
          expiresAt: Date.now() + 60_000,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    await loginAdmin("correct-password");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/admin/login",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
      }),
    );
  });
});

describe("getAdminSession", () => {
  it("verifies authentication with the server session endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          authenticated: true,
          expiresAt: Date.now() + 60_000,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    await expect(getAdminSession()).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/admin/session",
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      }),
    );
  });

  it("returns false when the server session is invalid", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            authenticated: false,
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      ),
    );

    await expect(getAdminSession()).resolves.toBe(false);
  });
});

describe("logoutAdmin", () => {
  it("calls the server logout endpoint with credentials", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    await logoutAdmin();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/admin/logout",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
      }),
    );
  });
});
