import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getAdminSession, loginAdmin, logoutAdmin } from "./admin-auth";

beforeEach(() => {
  const storage = new Map<string, string>();

  vi.stubGlobal("window", {
    localStorage: {
      clear: () => storage.clear(),
      getItem: (key: string) => storage.get(key) ?? null,
      removeItem: (key: string) => storage.delete(key),
      setItem: (key: string, value: string) => storage.set(key, value),
    },
  });
});

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

  it("stores a local session after a successful login", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
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
      ),
    );

    await loginAdmin("correct-password");

    await expect(getAdminSession()).resolves.toBe(true);
  });

  it("clears the local session on logout", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
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
      ),
    );

    await loginAdmin("correct-password");
    await logoutAdmin();

    await expect(getAdminSession()).resolves.toBe(false);
  });
});
