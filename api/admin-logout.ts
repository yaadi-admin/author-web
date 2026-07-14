import { logoutAdmin } from "../server/lib/admin_auth";

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
