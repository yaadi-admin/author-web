import type {
  AdminLoginRequest,
  AdminSessionResponse,
} from "@shared/api";

const fetchOptions: RequestInit = {
  credentials: "include",
  cache: "no-store",
  headers: {
    Accept: "application/json",
  },
};

const readResponse = async <T>(
  response: Response,
): Promise<{ data: T | null; rawText: string }> => {
  const rawText = await response.text();
  if (!rawText) {
    return { data: null, rawText: "" };
  }

  try {
    return {
      data: JSON.parse(rawText) as T,
      rawText,
    };
  } catch {
    return {
      data: null,
      rawText,
    };
  }
};

const getErrorMessage = (
  response: Response,
  data: AdminSessionResponse | null,
  rawText: string,
  fallback: string,
) => {
  if (data?.error) {
    return data.error;
  }

  const trimmed = rawText.trim();
  if (trimmed && !trimmed.startsWith("<")) {
    return trimmed;
  }

  if (response.status === 429) {
    return "Too many login attempts. Please wait and try again.";
  }

  if (response.status >= 500) {
    return "Admin login failed on the server.";
  }

  return fallback;
};

export const loginAdmin = async (password: string): Promise<AdminSessionResponse> => {
  const payload: AdminLoginRequest = { password };

  const response = await fetch("/api/admin-login", {
    ...fetchOptions,
    method: "POST",
    headers: {
      ...((fetchOptions.headers as Record<string, string>) || {}),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const { data, rawText } = await readResponse<AdminSessionResponse>(response);
  if (!response.ok || !data?.authenticated) {
    throw new Error(
      getErrorMessage(response, data, rawText, "Invalid password."),
    );
  }

  return data;
};

/**
 * Always verifies against the server HttpOnly session cookie.
 * Local storage is intentionally not used as an auth source of truth.
 */
export const getAdminSession = async (options?: {
  renew?: boolean;
}): Promise<boolean> => {
  try {
    const response = await fetch(
      options?.renew ? "/api/admin-session?renew=1" : "/api/admin-session",
      {
        ...fetchOptions,
        method: "GET",
      },
    );

    if (!response.ok) {
      return false;
    }

    const { data } = await readResponse<AdminSessionResponse>(response);
    return Boolean(data?.authenticated);
  } catch {
    return false;
  }
};

export const logoutAdmin = async (): Promise<void> => {
  try {
    await fetch("/api/admin-logout", {
      ...fetchOptions,
      method: "POST",
    });
  } catch {
    // Clear local UI state even if the network request fails.
  }
};
