import { readFileSync, writeFileSync } from "node:fs";

const auth = readFileSync("server/lib/admin_auth.ts", "utf8");
const banner =
  "// Auto-generated self-contained Vercel handler. Source of truth: server/lib/admin_auth.ts\n" +
  "// Run: node scripts/sync-admin-api.mjs\n";

const loginHandler = `
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
`;

const sessionHandler = `
export async function GET(request: Request) {
  const url = new URL(request.url);
  const renew = url.searchParams.get("renew") === "1";

  const result = await getAdminSessionResponse(request.headers.get("cookie"), {
    renew,
  });

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
}
`;

const logoutHandler = `
export async function POST() {
  const result = logoutAdmin();

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
}
`;

writeFileSync("api/admin-login.ts", banner + auth + loginHandler);
writeFileSync("api/admin-session.ts", banner + auth + sessionHandler);
writeFileSync("api/admin-logout.ts", banner + auth + logoutHandler);
console.log("Synced self-contained admin API handlers");
