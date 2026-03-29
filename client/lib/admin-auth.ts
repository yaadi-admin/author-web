import type {
  AdminLoginRequest,
  AdminSessionResponse,
} from "@shared/api";

const SESSION_STORAGE_KEY = "admin_session_expires_at";
const DEFAULT_SESSION_DURATION_MS = 120 * 60 * 1000;

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

const hasStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readStoredSessionExpiry = () => {
  if (!hasStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  const expiresAt = Number(rawValue);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }

  return expiresAt;
};

const storeSessionExpiry = (expiresAt?: number) => {
  if (!hasStorage()) {
    return;
  }

  window.localStorage.setItem(
    SESSION_STORAGE_KEY,
    String(expiresAt ?? Date.now() + DEFAULT_SESSION_DURATION_MS),
  );
};

const clearStoredSessionExpiry = () => {
  if (!hasStorage()) {
    return;
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY);
};

export const loginAdmin = async (password: string): Promise<AdminSessionResponse> => {
  const payload: AdminLoginRequest = { password };

  const response = await fetch("/api/admin/login", {
    method: "POST",
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

  storeSessionExpiry(data.expiresAt);
  return data;
};

export const getAdminSession = async (): Promise<boolean> =>
  readStoredSessionExpiry() !== null;

export const logoutAdmin = async (): Promise<void> => {
  clearStoredSessionExpiry();
};
