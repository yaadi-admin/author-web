import type {
  CoachingAssessmentRequest,
  CoachingIntakeRequest,
  CoachingWorkflowResponse,
} from "@shared/api";

const postCoachingPayload = async (
  payload: CoachingIntakeRequest | CoachingAssessmentRequest,
): Promise<CoachingWorkflowResponse> => {
  const response = await fetch("/api/coaching", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as CoachingWorkflowResponse | null;

  if (!response.ok || !data?.success) {
    throw new Error(data?.error || data?.message || "Failed to continue coaching workflow.");
  }

  return data;
};

export const submitCoachingIntake = async (
  payload: Omit<CoachingIntakeRequest, "step">,
): Promise<CoachingWorkflowResponse> =>
  postCoachingPayload({
    step: "intake",
    ...payload,
  });

export const submitCoachingAssessment = async (
  payload: Omit<CoachingAssessmentRequest, "step">,
): Promise<CoachingWorkflowResponse> =>
  postCoachingPayload({
    step: "assessment",
    ...payload,
  });
