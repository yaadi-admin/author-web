const SESSION_DURATION_MS = 120 * 60 * 1000;

const readEnv = (name: string) => {
  const value = process.env[name];
  if (typeof value !== "string") {
    return undefined;
  }

  return value === "" ? undefined : value;
};

const jsonResponse = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

export async function POST(request: Request) {
  try {
    const adminPassword = readEnv("ADMIN_PASSWORD");
    const body = await request
      .json()
      .catch(() => undefined) as { password?: string } | undefined;

    if (!adminPassword) {
      return jsonResponse(
        {
          authenticated: false,
          error: "ADMIN_PASSWORD is not configured.",
        },
        500,
      );
    }

    if (!body?.password) {
      return jsonResponse(
        {
          authenticated: false,
          error: "Password is required.",
        },
        400,
      );
    }

    if (body.password !== adminPassword) {
      return jsonResponse(
        {
          authenticated: false,
          error: "Invalid password.",
        },
        401,
      );
    }

    return jsonResponse(
      {
        authenticated: true,
        expiresAt: Date.now() + SESSION_DURATION_MS,
      },
      200,
    );
  } catch (error) {
    console.error("Vercel admin login error:", error);

    return jsonResponse(
      {
        authenticated: false,
        error: "Unable to validate password.",
      },
      500,
    );
  }
}
