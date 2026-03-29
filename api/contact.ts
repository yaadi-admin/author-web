import { submitContactForm } from "../server/lib/contact";

export async function POST(request: Request) {
  const body = await request
    .json()
    .catch(() => undefined);

  const result = await submitContactForm(body);
  return Response.json(result.body, { status: result.status });
}
