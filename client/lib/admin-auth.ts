import type {
  AdminLoginRequest,
  AdminSessionResponse,
} from "@shared/api";

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

  if (response.status >= 500) {
    return "Admin login failed on the server.";
  }

  return fallback;
};

export const loginAdmin = async (password: string): Promise<AdminSessionResponse> => {
  const payload: AdminLoginRequest = { password };

  const response = await fetch("/api/admin/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
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

export const getAdminSession = async (): Promise<boolean> => {
  const response = await fetch("/api/admin/session", {
    method: "GET",
    credentials: "same-origin",
  });

  if (!response.ok) {
    return false;
  }

  const { data } = await readResponse<AdminSessionResponse>(response);
  return Boolean(data?.authenticated);
};

export const logoutAdmin = async (): Promise<void> => {
  await fetch("/api/admin/logout", {
    method: "POST",
    credentials: "same-origin",
  }).catch(() => undefined);
};
