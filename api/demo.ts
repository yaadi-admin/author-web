import type { DemoResponse } from "@shared/api";

export function GET() {
  const payload: DemoResponse = {
    message: "Hello from Express server",
  };

  return Response.json(payload);
}
