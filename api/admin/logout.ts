import { logoutAdmin } from "../../server/lib/admin_auth";

const jsonResponse = (body: unknown, status: number, headers?: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
  });

export function POST() {
  const result = logoutAdmin();
  return jsonResponse(result.body, result.status, result.headers);
}
