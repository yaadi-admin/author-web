import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { z } from "zod";
import type {
  CoachingActionLinks,
  CoachingAssessmentRequest,
  CoachingIntakeRequest,
  CoachingWorkflowRequest,
  CoachingWorkflowResponse,
} from "@shared/api";
import type { JsonResult } from "./admin_auth";

const intakeSchema = z.object({
  step: z.literal("intake"),
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("A valid email address is required."),
  phone: z.string().trim().optional(),
  serviceInterest: z.string().trim().min(1, "Please choose a coaching focus."),
  preferredSessionType: z.string().trim().min(1, "Please choose a session format."),
  message: z.string().trim().min(20, "Please share a little more about what support you need."),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Terms must be accepted before continuing." }),
  }),
  communicationsOptIn: z.boolean().optional(),
});

const assessmentSchema = z.object({
  step: z.literal("assessment"),
  inquiryId: z.string().trim().min(1, "Missing coaching inquiry reference."),
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("A valid email address is required."),
  phone: z.string().trim().optional(),
  primaryChallenge: z.string().trim().min(15, "Please describe your primary challenge."),
  desiredOutcome: z.string().trim().min(15, "Please describe your desired outcome."),
  preferredTiming: z.string().trim().min(1, "Please choose your preferred availability."),
  priorCoachingExperience: z.string().trim().min(1, "Please tell us about prior coaching experience."),
  sessionCommitment: z.string().trim().min(1, "Please choose your commitment level."),
  prayerFocus: z.string().trim().optional(),
});

const coachingSchema = z.discriminatedUnion("step", [
  intakeSchema,
  assessmentSchema,
]);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatMultiline = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

const getResendClient = () => {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  return new Resend(resendApiKey);
};

const getFromAddress = () =>
  process.env.CONTACT_FROM_EMAIL ?? "info@suelynempoweredliving.com";

const getToAddress = () =>
  process.env.CONTACT_TO_EMAIL ?? "info@suelynempoweredliving.com";

const getBrandName = () =>
  process.env.CONTACT_BRAND_NAME ?? "SueLyn Empowered Living";

const getSiteUrl = () =>
  (process.env.PUBLIC_SITE_URL ?? "https://suelynempoweredliving.com").replace(/\/+$/, "");

const buildFallbackMailtoUrl = (subject: string, inquiryId: string, email: string) => {
  const toAddress = getToAddress();
  const body = encodeURIComponent(
    `Inquiry ID: ${inquiryId}\nClient Email: ${email}\n\nPlease send the next-step details for this coaching request.`,
  );
  return `mailto:${encodeURIComponent(toAddress)}?subject=${encodeURIComponent(subject)}&body=${body}`;
};

const getActionLinks = (
  inquiryId: string,
  email: string,
): { links: CoachingActionLinks; usingFallbackLinks: boolean } => {
  const siteUrl = getSiteUrl();
  const schedulingUrl =
    process.env.COACHING_SCHEDULING_URL?.trim() ||
    buildFallbackMailtoUrl("Schedule my coaching session", inquiryId, email);
  const paymentUrl =
    process.env.COACHING_PAYMENT_URL?.trim() ||
    buildFallbackMailtoUrl("Send my coaching payment link", inquiryId, email);

  return {
    links: {
      assessmentUrl: `${siteUrl}/workshops#new-client-assessment`,
      schedulingUrl,
      paymentUrl,
    },
    usingFallbackLinks:
      !process.env.COACHING_SCHEDULING_URL?.trim() ||
      !process.env.COACHING_PAYMENT_URL?.trim(),
  };
};

const renderActionButtons = (
  links: CoachingActionLinks,
  usingFallbackLinks: boolean,
) => `
  <div style="margin-top: 24px;">
    ${links.assessmentUrl
      ? `<a href="${escapeHtml(links.assessmentUrl)}" style="display: inline-block; margin: 0 12px 12px 0; padding: 12px 18px; background: #F84988; color: #ffffff; text-decoration: none; border-radius: 999px; font-weight: 600;">Complete Assessment</a>`
      : ""}
    ${links.schedulingUrl
      ? `<a href="${escapeHtml(links.schedulingUrl)}" style="display: inline-block; margin: 0 12px 12px 0; padding: 12px 18px; background: #111111; color: #ffffff; text-decoration: none; border-radius: 999px; font-weight: 600;">${usingFallbackLinks ? "Request Scheduling Link" : "Schedule Session"}</a>`
      : ""}
    ${links.paymentUrl
      ? `<a href="${escapeHtml(links.paymentUrl)}" style="display: inline-block; margin: 0 12px 12px 0; padding: 12px 18px; background: #FFAC24; color: #111111; text-decoration: none; border-radius: 999px; font-weight: 700;">${usingFallbackLinks ? "Request Payment Link" : "Make Payment"}</a>`
      : ""}
  </div>
`;

const buildIntakeBusinessEmail = (
  payload: CoachingIntakeRequest,
  inquiryId: string,
) => `
  <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #1a1a1a;">
    <h2 style="color: #F84988;">New Coaching Inquiry</h2>
    <p style="margin-top: 0;"><strong>Inquiry ID:</strong> ${escapeHtml(inquiryId)}</p>

    <h3 style="color: #FFAC24;">Contact Details</h3>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</li>
      <li><strong>Email:</strong> ${escapeHtml(payload.email)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(payload.phone?.trim() || "Not provided")}</li>
    </ul>

    <h3 style="color: #FFAC24;">Coaching Preferences</h3>
    <ul>
      <li><strong>Focus:</strong> ${escapeHtml(payload.serviceInterest)}</li>
      <li><strong>Session Type:</strong> ${escapeHtml(payload.preferredSessionType)}</li>
      <li><strong>Marketing Opt-In:</strong> ${payload.communicationsOptIn ? "Yes" : "No"}</li>
    </ul>

    <h3 style="color: #FFAC24;">What Support Is Needed</h3>
    <div style="background-color: #fff5f8; padding: 18px; border-radius: 12px; border-left: 4px solid #F84988;">
      ${formatMultiline(payload.message)}
    </div>
  </div>
`;

const buildAssessmentBusinessEmail = (
  payload: CoachingAssessmentRequest,
  links: CoachingActionLinks,
  usingFallbackLinks: boolean,
) => `
  <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #1a1a1a;">
    <h2 style="color: #F84988;">New Client Assessment Completed</h2>
    <p style="margin-top: 0;"><strong>Inquiry ID:</strong> ${escapeHtml(payload.inquiryId)}</p>

    <h3 style="color: #FFAC24;">Client Details</h3>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</li>
      <li><strong>Email:</strong> ${escapeHtml(payload.email)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(payload.phone?.trim() || "Not provided")}</li>
      <li><strong>Availability:</strong> ${escapeHtml(payload.preferredTiming)}</li>
      <li><strong>Prior Coaching:</strong> ${escapeHtml(payload.priorCoachingExperience)}</li>
      <li><strong>Commitment:</strong> ${escapeHtml(payload.sessionCommitment)}</li>
    </ul>

    <h3 style="color: #FFAC24;">Assessment Summary</h3>
    <p><strong>Primary Challenge</strong><br />${formatMultiline(payload.primaryChallenge)}</p>
    <p><strong>Desired Outcome</strong><br />${formatMultiline(payload.desiredOutcome)}</p>
    <p><strong>Prayer Focus</strong><br />${formatMultiline(payload.prayerFocus?.trim() || "Not provided")}</p>

    <h3 style="color: #FFAC24;">Client Next Steps</h3>
    <p>${usingFallbackLinks ? "Scheduling and payment currently route through email fallback links." : "Scheduling and payment links were sent to the client automatically."}</p>
    ${renderActionButtons(links, usingFallbackLinks)}
  </div>
`;

const buildIntakeCustomerEmail = (
  payload: CoachingIntakeRequest,
  inquiryId: string,
  links: CoachingActionLinks,
) => {
  const brandName = escapeHtml(getBrandName());

  return `
    <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="color: #F84988;">Your Coaching Request Has Started</h2>
      <p>Dear ${escapeHtml(payload.firstName)},</p>
      <p>Thank you for reaching out to ${brandName}. Your coaching inquiry has been received.</p>
      <p><strong>Your inquiry ID:</strong> ${escapeHtml(inquiryId)}</p>
      <p>The next step is your New Client Assessment Form so we can guide you into the right session, schedule, and payment path.</p>
      ${renderActionButtons(
        {
          assessmentUrl: links.assessmentUrl,
        },
        false,
      )}
      <p style="margin-top: 20px;">We look forward to walking with you.</p>
      <p>With care,<br />${brandName}</p>
    </div>
  `;
};

const buildAssessmentCustomerEmail = (
  payload: CoachingAssessmentRequest,
  links: CoachingActionLinks,
  usingFallbackLinks: boolean,
) => {
  const brandName = escapeHtml(getBrandName());

  return `
    <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="color: #F84988;">Your Next Coaching Steps Are Ready</h2>
      <p>Dear ${escapeHtml(payload.firstName)},</p>
      <p>We received your New Client Assessment Form and prepared the next step for your coaching journey.</p>
      <p><strong>Your inquiry ID:</strong> ${escapeHtml(payload.inquiryId)}</p>
      <p>${usingFallbackLinks ? "Use the buttons below to request your scheduling and payment links." : "Use the buttons below to schedule your session and complete payment."}</p>
      ${renderActionButtons(links, usingFallbackLinks)}
      <p style="margin-top: 20px;">We are honored to support your healing and growth.</p>
      <p>With care,<br />${brandName}</p>
    </div>
  `;
};

export const submitCoachingWorkflow = async (
  body: unknown,
): Promise<JsonResult<CoachingWorkflowResponse>> => {
  try {
    const result = coachingSchema.safeParse(body);

    if (!result.success) {
      return {
        status: 400,
        body: {
          success: false,
          error: result.error.issues[0]?.message ?? "Invalid coaching payload.",
          message: "Unable to continue the coaching workflow.",
        },
      };
    }

    const payload = result.data as CoachingWorkflowRequest;
    const resend = getResendClient();
    const transporter = resend.emails;
    const brandName = getBrandName();
    const fromAddress = getFromAddress();
    const toAddress = getToAddress();

    if (payload.step === "intake") {
      const inquiryId = `coach-${randomUUID().slice(0, 8)}`;
      const { links, usingFallbackLinks } = getActionLinks(inquiryId, payload.email);

      await transporter.send({
        from: `${brandName} <${fromAddress}>`,
        to: [toAddress],
        subject: `New Coaching Inquiry (${inquiryId})`,
        html: buildIntakeBusinessEmail(payload, inquiryId),
        replyTo: payload.email,
      });

      const customerError = await transporter
        .send({
          from: `${brandName} <${fromAddress}>`,
          to: [payload.email],
          subject: `Continue your coaching request (${inquiryId})`,
          html: buildIntakeCustomerEmail(payload, inquiryId, links),
        })
        .then(() => null)
        .catch((error) => {
          console.error("Coaching intake confirmation email error:", error);
          return error;
        });

      return {
        status: 200,
        body: {
          success: true,
          inquiryId,
          nextStep: "assessment",
          links,
          usingFallbackLinks,
          message:
            "Your coaching request is in. Complete the New Client Assessment Form to continue to scheduling and payment.",
          ...(customerError
            ? {
                warning:
                  "Your request was received, but the confirmation email could not be sent.",
              }
            : {}),
        },
      };
    }

    const { links, usingFallbackLinks } = getActionLinks(payload.inquiryId, payload.email);

    await transporter.send({
      from: `${brandName} <${fromAddress}>`,
      to: [toAddress],
      subject: `New Client Assessment (${payload.inquiryId})`,
      html: buildAssessmentBusinessEmail(payload, links, usingFallbackLinks),
      replyTo: payload.email,
    });

    const customerError = await transporter
      .send({
        from: `${brandName} <${fromAddress}>`,
        to: [payload.email],
        subject: `Your coaching next steps (${payload.inquiryId})`,
        html: buildAssessmentCustomerEmail(payload, links, usingFallbackLinks),
      })
      .then(() => null)
      .catch((error) => {
        console.error("Coaching assessment confirmation email error:", error);
        return error;
      });

    return {
      status: 200,
      body: {
        success: true,
        inquiryId: payload.inquiryId,
        nextStep: "complete",
        links,
        usingFallbackLinks,
        message: usingFallbackLinks
          ? "Assessment received. Use the buttons below to request your scheduling and payment links."
          : "Assessment received. You can now schedule your session and make payment.",
        ...(customerError
          ? {
              warning:
                "Your assessment was received, but the confirmation email could not be sent.",
            }
          : {}),
      },
    };
  } catch (error) {
    console.error("Coaching workflow error:", error);

    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to continue the coaching workflow. Please try again later.",
        error: "Failed to continue the coaching workflow. Please try again later.",
      },
    };
  }
};
