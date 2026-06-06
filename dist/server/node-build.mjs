import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import { Resend } from "resend";
import { z } from "zod";
import { randomUUID } from "node:crypto";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("A valid email address is required."),
  message: z.string().trim().min(1, "Message is required."),
  phone: z.string().trim().optional(),
  title: z.string().trim().optional(),
  source: z.string().trim().optional(),
  registrationDetails: z.object({
    fullName: z.string().trim().min(1, "Full name is required."),
    partnerName: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    packageSelection: z.string().trim().min(1, "Package selection is required."),
    emergencyContact: z.string().trim().optional(),
    paymentPlanRequest: z.string().trim().optional()
  }).optional()
});
const escapeHtml$1 = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const getResendClient$1 = () => {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(resendApiKey);
};
const getFromAddress$1 = () => process.env.CONTACT_FROM_EMAIL ?? "info@suelynempoweredliving.com";
const getToAddress$1 = () => process.env.CONTACT_TO_EMAIL ?? "suegriffiths.author@gmail.com";
const getBrandName$1 = () => process.env.CONTACT_BRAND_NAME ?? "SueLyn Empowered Living";
const formatMultiline$1 = (value) => escapeHtml$1(value).replace(/\n/g, "<br />");
const renderField = (label, value) => `
  <tr>
    <td style="padding: 12px 14px; font-weight: 700; color: #3a1a26; width: 38%; vertical-align: top; border-bottom: 1px solid #f3e3ea;">${escapeHtml$1(label)}</td>
    <td style="padding: 12px 14px; color: #40373b; border-bottom: 1px solid #f3e3ea;">${escapeHtml$1(
  value?.trim() || "Not provided"
)}</td>
  </tr>
`;
const buildBusinessEmail = (payload) => {
  if (payload.registrationDetails) {
    const title2 = escapeHtml$1(payload.title?.trim() || "Love Never Ends Registration");
    const source2 = escapeHtml$1(payload.source?.trim() || "website");
    const details = payload.registrationDetails;
    return `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #23181d;">
        <div style="padding: 24px 28px; border-radius: 24px; background: linear-gradient(135deg, #fff5f8 0%, #fff0db 100%); border: 1px solid #f7d5e2;">
          <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #a34767;">New Registration Submission</p>
          <h2 style="margin: 0; color: #F84988; font-size: 30px;">${title2}</h2>
          <p style="margin: 14px 0 0; color: #5e4b53; line-height: 1.6;">
            A new Love Never Ends registration has been submitted through the ${source2} form.
          </p>
        </div>

        <div style="margin-top: 24px; background: #ffffff; border: 1px solid #f3e3ea; border-radius: 20px; overflow: hidden;">
          <div style="padding: 18px 22px; background: #fff7ef; border-bottom: 1px solid #f3e3ea;">
            <h3 style="margin: 0; color: #FFAC24;">Registrant Details</h3>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            ${renderField("Full Name", details.fullName)}
            ${renderField("Spouse / Partner Name", details.partnerName)}
            ${renderField("Email Address", payload.email)}
            ${renderField("Phone Number", details.phone || payload.phone)}
            ${renderField("Package Selection", details.packageSelection)}
            ${renderField("Emergency Contact", details.emergencyContact)}
            ${renderField("Payment Plan Request", details.paymentPlanRequest)}
          </table>
        </div>

        <div style="margin-top: 24px; background: #ffffff; border: 1px solid #f3e3ea; border-radius: 20px; overflow: hidden;">
          <div style="padding: 18px 22px; background: #fff7ef; border-bottom: 1px solid #f3e3ea;">
            <h3 style="margin: 0; color: #FFAC24;">Submission Notes</h3>
          </div>
          <div style="padding: 22px; line-height: 1.7; color: #40373b;">
            ${formatMultiline$1(payload.message)}
          </div>
        </div>
      </div>
    `;
  }
  const title = escapeHtml$1(payload.title?.trim() || "New Contact Message");
  const source = escapeHtml$1(payload.source?.trim() || "website");
  const name = escapeHtml$1(payload.name);
  const email = escapeHtml$1(payload.email);
  const phone = escapeHtml$1(payload.phone?.trim() || "Not provided");
  const message = formatMultiline$1(payload.message);
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #F84988;">${title}</h2>

      <h3 style="color: #FFAC24;">Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>

      <h3 style="color: #FFAC24;">Message:</h3>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FFAC24;">
        <p style="margin: 0; line-height: 1.6;">${message}</p>
      </div>

      <p style="margin-top: 20px; color: #6c757d; font-size: 14px;">
        This message was sent from the ${source} form.
      </p>
    </div>
  `;
};
const buildCustomerEmail = (payload) => {
  if (payload.registrationDetails) {
    const name2 = escapeHtml$1(payload.registrationDetails.fullName);
    const brandName2 = escapeHtml$1(getBrandName$1());
    const packageName = escapeHtml$1(payload.registrationDetails.packageSelection);
    return `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #23181d;">
        <div style="padding: 28px; border-radius: 24px; background: linear-gradient(135deg, #fff5f8 0%, #fff0db 100%); border: 1px solid #f7d5e2;">
          <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #a34767;">Registration Received</p>
          <h2 style="margin: 0; color: #F84988; font-size: 30px;">Thank You for Registering</h2>
          <p style="margin: 14px 0 0; line-height: 1.7; color: #4b3941;">
            Dear ${name2}, your Love Never Ends registration has been received. We are honored to support your next step toward healing, restoration, and alignment.
          </p>
        </div>

        <div style="margin-top: 24px; background: #ffffff; border: 1px solid #f3e3ea; border-radius: 20px; overflow: hidden;">
          <div style="padding: 18px 22px; background: #fff7ef; border-bottom: 1px solid #f3e3ea;">
            <h3 style="margin: 0; color: #FFAC24;">Registration Summary</h3>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            ${renderField("Full Name", payload.registrationDetails.fullName)}
            ${renderField("Spouse / Partner Name", payload.registrationDetails.partnerName)}
            ${renderField("Email Address", payload.email)}
            ${renderField("Phone Number", payload.registrationDetails.phone || payload.phone)}
            ${renderField("Package Selection", payload.registrationDetails.packageSelection)}
            ${renderField("Emergency Contact", payload.registrationDetails.emergencyContact)}
            ${renderField("Payment Plan Request", payload.registrationDetails.paymentPlanRequest)}
          </table>
        </div>

        <div style="margin-top: 24px; padding: 24px 28px; background: #ffffff; border: 1px solid #f3e3ea; border-radius: 20px;">
          <p style="margin: 0 0 14px; line-height: 1.7; color: #40373b;">
            <strong>Selected package:</strong> ${packageName}
          </p>
          <p style="margin: 0 0 14px; line-height: 1.7; color: #40373b;">
            Registration fees are non-refundable, and all remaining payments must be completed by August 31, 2026.
          </p>
          <p style="margin: 0; line-height: 1.7; color: #40373b;">
            If you requested a payment plan or need support, reply to this email or contact
            <a href="mailto:suegriffiths.author@gmail.com" style="color: #F84988; font-weight: 700; text-decoration: none;"> suegriffiths.author@gmail.com</a>.
          </p>
        </div>

        <p style="margin-top: 24px; color: #5e4b53; line-height: 1.7;">
          With care,<br />${brandName2}
        </p>
      </div>
    `;
  }
  const name = escapeHtml$1(payload.name);
  const message = formatMultiline$1(payload.message);
  const brandName = escapeHtml$1(getBrandName$1());
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #F84988;">Thank You for Reaching Out</h2>
      <p>Dear ${name},</p>
      <p>Thank you for contacting ${brandName}. We received your message and will follow up soon.</p>

      <h3 style="color: #FFAC24;">Your Message:</h3>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FFAC24;">
        <p style="margin: 0; line-height: 1.6;">${message}</p>
      </div>

      <p>Best regards,<br>${brandName}</p>
    </div>
  `;
};
const submitContactForm = async (body) => {
  try {
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return {
        status: 400,
        body: {
          success: false,
          error: result.error.issues[0]?.message ?? "Invalid contact form payload.",
          message: "Unable to submit the contact form."
        }
      };
    }
    const payload = result.data;
    const resend = getResendClient$1();
    const transporter = resend.emails;
    const brandName = getBrandName$1();
    const fromAddress = getFromAddress$1();
    const toAddress = getToAddress$1();
    await transporter.send({
      from: `${brandName} <${fromAddress}>`,
      to: [toAddress],
      subject: payload.title?.trim() || `New Message from ${payload.source?.trim() || "Website"}`,
      html: buildBusinessEmail(payload),
      replyTo: payload.email
    });
    const customerResult = await transporter.send({
      from: `${brandName} <${fromAddress}>`,
      to: [payload.email],
      subject: payload.registrationDetails ? "Your Love Never Ends registration was received" : `Thanks for contacting ${brandName}`,
      html: buildCustomerEmail(payload)
    }).then(() => null).catch((error) => {
      console.error("Confirmation email error:", error);
      return error;
    });
    return {
      status: 200,
      body: {
        success: true,
        message: "Contact form submitted successfully. We will get back to you soon.",
        ...customerResult ? {
          warning: "Your message was received, but the confirmation email could not be sent."
        } : {}
      }
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to submit contact form. Please try again later.",
        error: "Failed to submit contact form. Please try again later."
      }
    };
  }
};
const handleContactForm = async (request, response) => {
  const result = await submitContactForm(request.body);
  return response.status(result.status).json(result.body);
};
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
    errorMap: () => ({ message: "Terms must be accepted before continuing." })
  }),
  communicationsOptIn: z.boolean().optional()
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
  prayerFocus: z.string().trim().optional()
});
const coachingSchema = z.discriminatedUnion("step", [
  intakeSchema,
  assessmentSchema
]);
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const formatMultiline = (value) => escapeHtml(value).replace(/\n/g, "<br />");
const getResendClient = () => {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(resendApiKey);
};
const getFromAddress = () => process.env.CONTACT_FROM_EMAIL ?? "info@suelynempoweredliving.com";
const getToAddress = () => process.env.CONTACT_TO_EMAIL ?? "suegriffiths.author@gmail.com";
const getBrandName = () => process.env.CONTACT_BRAND_NAME ?? "SueLyn Empowered Living";
const getSiteUrl = () => (process.env.PUBLIC_SITE_URL ?? "https://suelynempoweredliving.com").replace(/\/+$/, "");
const buildFallbackMailtoUrl = (subject, inquiryId, email) => {
  const toAddress = getToAddress();
  const body = encodeURIComponent(
    `Inquiry ID: ${inquiryId}
Client Email: ${email}

Please send the next-step details for this coaching request.`
  );
  return `mailto:${encodeURIComponent(toAddress)}?subject=${encodeURIComponent(subject)}&body=${body}`;
};
const getActionLinks = (inquiryId, email) => {
  const siteUrl = getSiteUrl();
  const schedulingUrl = process.env.COACHING_SCHEDULING_URL?.trim() || buildFallbackMailtoUrl("Schedule my coaching session", inquiryId, email);
  const paymentUrl = process.env.COACHING_PAYMENT_URL?.trim() || buildFallbackMailtoUrl("Send my coaching payment link", inquiryId, email);
  return {
    links: {
      assessmentUrl: `${siteUrl}/workshops#new-client-assessment`,
      schedulingUrl,
      paymentUrl
    },
    usingFallbackLinks: !process.env.COACHING_SCHEDULING_URL?.trim() || !process.env.COACHING_PAYMENT_URL?.trim()
  };
};
const renderActionButtons = (links, usingFallbackLinks) => `
  <div style="margin-top: 24px;">
    ${links.assessmentUrl ? `<a href="${escapeHtml(links.assessmentUrl)}" style="display: inline-block; margin: 0 12px 12px 0; padding: 12px 18px; background: #F84988; color: #ffffff; text-decoration: none; border-radius: 999px; font-weight: 600;">Complete Assessment</a>` : ""}
    ${links.schedulingUrl ? `<a href="${escapeHtml(links.schedulingUrl)}" style="display: inline-block; margin: 0 12px 12px 0; padding: 12px 18px; background: #111111; color: #ffffff; text-decoration: none; border-radius: 999px; font-weight: 600;">${usingFallbackLinks ? "Request Scheduling Link" : "Schedule Session"}</a>` : ""}
    ${links.paymentUrl ? `<a href="${escapeHtml(links.paymentUrl)}" style="display: inline-block; margin: 0 12px 12px 0; padding: 12px 18px; background: #FFAC24; color: #111111; text-decoration: none; border-radius: 999px; font-weight: 700;">${usingFallbackLinks ? "Request Payment Link" : "Make Payment"}</a>` : ""}
  </div>
`;
const buildIntakeBusinessEmail = (payload, inquiryId) => `
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
const buildAssessmentBusinessEmail = (payload, links, usingFallbackLinks) => `
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
const buildIntakeCustomerEmail = (payload, inquiryId, links) => {
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
      assessmentUrl: links.assessmentUrl
    },
    false
  )}
      <p style="margin-top: 20px;">We look forward to walking with you.</p>
      <p>With care,<br />${brandName}</p>
    </div>
  `;
};
const buildAssessmentCustomerEmail = (payload, links, usingFallbackLinks) => {
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
const submitCoachingWorkflow = async (body) => {
  try {
    const result = coachingSchema.safeParse(body);
    if (!result.success) {
      return {
        status: 400,
        body: {
          success: false,
          error: result.error.issues[0]?.message ?? "Invalid coaching payload.",
          message: "Unable to continue the coaching workflow."
        }
      };
    }
    const payload = result.data;
    const resend = getResendClient();
    const transporter = resend.emails;
    const brandName = getBrandName();
    const fromAddress = getFromAddress();
    const toAddress = getToAddress();
    if (payload.step === "intake") {
      const inquiryId = `coach-${randomUUID().slice(0, 8)}`;
      const { links: links2, usingFallbackLinks: usingFallbackLinks2 } = getActionLinks(inquiryId, payload.email);
      await transporter.send({
        from: `${brandName} <${fromAddress}>`,
        to: [toAddress],
        subject: `New Coaching Inquiry (${inquiryId})`,
        html: buildIntakeBusinessEmail(payload, inquiryId),
        replyTo: payload.email
      });
      const customerError2 = await transporter.send({
        from: `${brandName} <${fromAddress}>`,
        to: [payload.email],
        subject: `Continue your coaching request (${inquiryId})`,
        html: buildIntakeCustomerEmail(payload, inquiryId, links2)
      }).then(() => null).catch((error) => {
        console.error("Coaching intake confirmation email error:", error);
        return error;
      });
      return {
        status: 200,
        body: {
          success: true,
          inquiryId,
          nextStep: "assessment",
          links: links2,
          usingFallbackLinks: usingFallbackLinks2,
          message: "Your coaching request is in. Complete the New Client Assessment Form to continue to scheduling and payment.",
          ...customerError2 ? {
            warning: "Your request was received, but the confirmation email could not be sent."
          } : {}
        }
      };
    }
    const { links, usingFallbackLinks } = getActionLinks(payload.inquiryId, payload.email);
    await transporter.send({
      from: `${brandName} <${fromAddress}>`,
      to: [toAddress],
      subject: `New Client Assessment (${payload.inquiryId})`,
      html: buildAssessmentBusinessEmail(payload, links, usingFallbackLinks),
      replyTo: payload.email
    });
    const customerError = await transporter.send({
      from: `${brandName} <${fromAddress}>`,
      to: [payload.email],
      subject: `Your coaching next steps (${payload.inquiryId})`,
      html: buildAssessmentCustomerEmail(payload, links, usingFallbackLinks)
    }).then(() => null).catch((error) => {
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
        message: usingFallbackLinks ? "Assessment received. Use the buttons below to request your scheduling and payment links." : "Assessment received. You can now schedule your session and make payment.",
        ...customerError ? {
          warning: "Your assessment was received, but the confirmation email could not be sent."
        } : {}
      }
    };
  } catch (error) {
    console.error("Coaching workflow error:", error);
    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to continue the coaching workflow. Please try again later.",
        error: "Failed to continue the coaching workflow. Please try again later."
      }
    };
  }
};
const handleCoachingWorkflow = async (request, response) => {
  const result = await submitCoachingWorkflow(request.body);
  return response.status(result.status).json(result.body);
};
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 120 * 60 * 1e3;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const readEnv = (name) => {
  const value = process.env[name];
  if (typeof value !== "string") {
    return void 0;
  }
  return value === "" ? void 0 : value;
};
const getAdminPassword = () => readEnv("ADMIN_PASSWORD");
const getSessionSecret = () => readEnv("ADMIN_SESSION_SECRET") ?? readEnv("ADMIN_PASSWORD");
const toBase64 = (bytes) => {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};
const fromBase64 = (value) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
const toBase64Url = (bytes) => toBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
const fromBase64Url = (value) => {
  const padding = (4 - (value.length % 4 || 4)) % 4;
  const base64 = `${value.replace(/-/g, "+").replace(/_/g, "/")}${"=".repeat(padding)}`;
  return fromBase64(base64);
};
const parseCookies = (cookieHeader) => {
  if (!cookieHeader) {
    return {};
  }
  return cookieHeader.split(";").reduce((cookies, pair) => {
    const [rawKey, ...rawValue] = pair.trim().split("=");
    if (!rawKey) {
      return cookies;
    }
    cookies[rawKey] = decodeURIComponent(rawValue.join("="));
    return cookies;
  }, {});
};
const createHmacKey = async (usage) => {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }
  return globalThis.crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    [usage]
  );
};
const signPayload = async (payload) => {
  const key = await createHmacKey("sign");
  if (!key) {
    return null;
  }
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(payload)
  );
  return toBase64Url(new Uint8Array(signature));
};
const createSessionToken = async (expiresAt) => {
  const payload = toBase64Url(textEncoder.encode(JSON.stringify({ exp: expiresAt })));
  const signature = await signPayload(payload);
  if (!signature) {
    throw new Error("Admin session secret is not configured.");
  }
  return `${payload}.${signature}`;
};
const getSessionExpiry = async (cookieHeader) => {
  const token = parseCookies(cookieHeader)[SESSION_COOKIE_NAME];
  if (!token) {
    return null;
  }
  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }
  const key = await createHmacKey("verify");
  if (!key) {
    return null;
  }
  const isValidSignature = await globalThis.crypto.subtle.verify(
    "HMAC",
    key,
    fromBase64Url(signature),
    textEncoder.encode(payload)
  );
  if (!isValidSignature) {
    return null;
  }
  try {
    const decoded = JSON.parse(textDecoder.decode(fromBase64Url(payload)));
    if (typeof decoded.exp !== "number" || decoded.exp <= Date.now()) {
      return null;
    }
    return decoded.exp;
  } catch {
    return null;
  }
};
const buildCookie = (token, maxAgeSeconds) => [
  `${SESSION_COOKIE_NAME}=${token}`,
  "HttpOnly",
  "Path=/",
  "SameSite=Lax",
  `Max-Age=${maxAgeSeconds}`,
  "Secure"
].filter(Boolean).join("; ");
const clearCookie = () => [
  `${SESSION_COOKIE_NAME}=`,
  "HttpOnly",
  "Path=/",
  "SameSite=Lax",
  "Max-Age=0",
  "Secure"
].filter(Boolean).join("; ");
const loginAdmin = async (body) => {
  try {
    const adminPassword = getAdminPassword();
    const password = body?.password;
    if (!adminPassword) {
      return {
        status: 500,
        body: {
          authenticated: false,
          error: "ADMIN_PASSWORD is not configured."
        }
      };
    }
    if (!password) {
      return {
        status: 400,
        body: {
          authenticated: false,
          error: "Password is required."
        }
      };
    }
    if (password !== adminPassword) {
      return {
        status: 401,
        body: {
          authenticated: false,
          error: "Invalid password."
        }
      };
    }
    const expiresAt = Date.now() + SESSION_DURATION_MS;
    const token = await createSessionToken(expiresAt);
    return {
      status: 200,
      headers: {
        "Set-Cookie": buildCookie(token, Math.floor(SESSION_DURATION_MS / 1e3))
      },
      body: {
        authenticated: true,
        expiresAt
      }
    };
  } catch (error) {
    console.error("Admin login error:", error);
    return {
      status: 500,
      body: {
        authenticated: false,
        error: "Unable to start admin session."
      }
    };
  }
};
const getAdminSessionResponse = async (cookieHeader) => {
  const expiresAt = await getSessionExpiry(cookieHeader ?? void 0);
  if (!expiresAt) {
    return {
      status: 401,
      headers: {
        "Set-Cookie": clearCookie()
      },
      body: {
        authenticated: false
      }
    };
  }
  return {
    status: 200,
    body: {
      authenticated: true,
      expiresAt
    }
  };
};
const logoutAdmin = () => ({
  status: 200,
  headers: {
    "Set-Cookie": clearCookie()
  },
  body: {
    success: true
  }
});
const handleAdminLogin = async (request, response) => {
  const result = await loginAdmin(request.body);
  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }
  return response.status(result.status).json(result.body);
};
const handleAdminSession = async (request, response) => {
  const result = await getAdminSessionResponse(request.headers.cookie);
  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }
  return response.status(result.status).json(result.body);
};
const handleAdminLogout = (_request, response) => {
  const result = logoutAdmin();
  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }
  return response.status(result.status).json(result.body);
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app2.get("/api/demo", handleDemo);
  app2.post("/api/contact", handleContactForm);
  app2.post("/api/coaching", handleCoachingWorkflow);
  app2.post("/api/admin/login", handleAdminLogin);
  app2.get("/api/admin/session", handleAdminSession);
  app2.post("/api/admin/logout", handleAdminLogout);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
