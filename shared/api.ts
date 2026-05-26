/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  phone?: string;
  title?: string;
  source?: string;
  registrationDetails?: {
    fullName: string;
    partnerName?: string;
    phone?: string;
    packageSelection: string;
    emergencyContact?: string;
    paymentPlanRequest?: string;
  };
}

export interface ContactResponse {
  success: boolean;
  message: string;
  warning?: string;
  error?: string;
}

export type CoachingWorkflowStep = "intake" | "assessment";

export interface CoachingActionLinks {
  assessmentUrl?: string;
  schedulingUrl?: string;
  paymentUrl?: string;
}

export interface CoachingIntakeRequest {
  step: "intake";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  preferredSessionType: string;
  message: string;
  termsAccepted: boolean;
  communicationsOptIn?: boolean;
}

export interface CoachingAssessmentRequest {
  step: "assessment";
  inquiryId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  primaryChallenge: string;
  desiredOutcome: string;
  preferredTiming: string;
  priorCoachingExperience: string;
  sessionCommitment: string;
  prayerFocus?: string;
}

export type CoachingWorkflowRequest =
  | CoachingIntakeRequest
  | CoachingAssessmentRequest;

export interface CoachingWorkflowResponse {
  success: boolean;
  message: string;
  error?: string;
  warning?: string;
  inquiryId?: string;
  nextStep?: "assessment" | "complete";
  links?: CoachingActionLinks;
  usingFallbackLinks?: boolean;
}

export interface AdminLoginRequest {
  password: string;
}

export interface AdminSessionResponse {
  authenticated: boolean;
  expiresAt?: number;
  error?: string;
}
