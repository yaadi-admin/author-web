import type { ContactRequest, ContactResponse } from "@shared/api";

export const submitContactForm = async (
  payload: ContactRequest,
): Promise<ContactResponse> => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as ContactResponse | null;

  if (!response.ok || !data?.success) {
    throw new Error(data?.error || data?.message || "Failed to submit form.");
  }

  return data;
};
