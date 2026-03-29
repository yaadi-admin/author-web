export function GET() {
  return Response.json({
    message: process.env.PING_MESSAGE ?? "ping",
  });
}
