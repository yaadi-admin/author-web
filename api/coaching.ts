import { submitCoachingWorkflow } from "../server/lib/coaching";

export async function POST(request: Request) {
  const body = await request
    .json()
    .catch(() => undefined);

  const result = await submitCoachingWorkflow(body);
  return Response.json(result.body, { status: result.status });
}
