export function GET() {
  return new Response(
    JSON.stringify({
      authenticated: false,
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
