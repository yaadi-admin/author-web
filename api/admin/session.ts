import { getAdminSessionResponse } from "../lib/admin_auth";

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
