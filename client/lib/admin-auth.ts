import type {
  AdminLoginRequest,
  AdminSessionResponse,
} from "@shared/api";

const getJson = async <T>(response: Response): Promise<T | null> => {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
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

  const data = await getJson<AdminSessionResponse>(response);
  if (!response.ok || !data?.authenticated) {
    throw new Error(data?.error || "Invalid password.");
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

  const data = await getJson<AdminSessionResponse>(response);
  return Boolean(data?.authenticated);
};

export const logoutAdmin = async (): Promise<void> => {
  await fetch("/api/admin/logout", {
    method: "POST",
    credentials: "same-origin",
  }).catch(() => undefined);
};
