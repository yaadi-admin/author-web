import { loginAdmin } from "../../server/lib/admin_auth";

const jsonResponse = (body: unknown, status: number, headers?: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
  });

export async function POST(request: Request) {
  const body = await request
    .json()
    .catch(() => undefined);

  const result = await loginAdmin(body);
  return jsonResponse(result.body, result.status, result.headers);
}
