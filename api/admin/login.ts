import {
  loginAdmin,
} from "../lib/admin_auth";

const applyResult = <T extends object>(result: {
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

const getClientKey = (request: Request) => {
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
      clientKey: getClientKey(request),
    });

    return applyResult(result);
  } catch (error) {
    console.error("Vercel admin login error:", error);

    return applyResult({
      status: 500,
      body: {
        authenticated: false,
        error: "Unable to validate password.",
      },
    });
  }
}
