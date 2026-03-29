import { getAdminSessionResponse } from "../../server/lib/admin_auth";

const jsonResponse = (body: unknown, status: number, headers?: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
  });

export async function GET(request: Request) {
  const result = await getAdminSessionResponse(request.headers.get("cookie"));
  return jsonResponse(result.body, result.status, result.headers);
}
