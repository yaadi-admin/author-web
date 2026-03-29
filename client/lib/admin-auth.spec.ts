import { afterEach, describe, expect, it, vi } from "vitest";
import { loginAdmin } from "./admin-auth";

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
});
