import { Resend } from "resend";
import { z } from "zod";
import type { ContactRequest, ContactResponse } from "../../shared/api";

interface JsonResult<T> {
  status: number;
  body: T;
  headers?: Record<string, string>;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("A valid email address is required."),
  message: z.string().trim().min(1, "Message is required."),
  phone: z.string().trim().optional(),
  title: z.string().trim().optional(),
  source: z.string().trim().optional(),
  registrationDetails: z
    .object({
      fullName: z.string().trim().min(1, "Full name is required."),
      partnerName: z.string().trim().optional(),
      phone: z.string().trim().optional(),
      packageSelection: z.string().trim().min(1, "Package selection is required."),
      emergencyContact: z.string().trim().optional(),
      paymentPlanRequest: z.string().trim().optional(),
    })
    .optional(),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

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
  process.env.CONTACT_TO_EMAIL ?? "suegriffiths.author@gmail.com";

const getBrandName = () =>
  process.env.CONTACT_BRAND_NAME ?? "SueLyn Empowered Living";

const formatMultiline = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

const renderField = (label: string, value?: string) => `
  <tr>
    <td style="padding: 12px 14px; font-weight: 700; color: #3a1a26; width: 38%; vertical-align: top; border-bottom: 1px solid #f3e3ea;">${escapeHtml(label)}</td>
    <td style="padding: 12px 14px; color: #40373b; border-bottom: 1px solid #f3e3ea;">${escapeHtml(
      value?.trim() || "Not provided",
    )}</td>
  </tr>
`;

const buildBusinessEmail = (payload: ContactRequest) => {
  if (payload.registrationDetails) {
    const title = escapeHtml(payload.title?.trim() || "Love Never Ends Registration");
    const source = escapeHtml(payload.source?.trim() || "website");
    const details = payload.registrationDetails;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #23181d;">
        <div style="padding: 24px 28px; border-radius: 24px; background: linear-gradient(135deg, #fff5f8 0%, #fff0db 100%); border: 1px solid #f7d5e2;">
          <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #a34767;">New Registration Submission</p>
          <h2 style="margin: 0; color: #F84988; font-size: 30px;">${title}</h2>
          <p style="margin: 14px 0 0; color: #5e4b53; line-height: 1.6;">
            A new Love Never Ends registration has been submitted through the ${source} form.
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
            ${formatMultiline(payload.message)}
          </div>
        </div>
      </div>
    `;
  }

  const title = escapeHtml(payload.title?.trim() || "New Contact Message");
  const source = escapeHtml(payload.source?.trim() || "website");
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const phone = escapeHtml(payload.phone?.trim() || "Not provided");
  const message = formatMultiline(payload.message);

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

const buildCustomerEmail = (payload: ContactRequest) => {
  if (payload.registrationDetails) {
    const name = escapeHtml(payload.registrationDetails.fullName);
    const brandName = escapeHtml(getBrandName());
    const packageName = escapeHtml(payload.registrationDetails.packageSelection);

    return `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #23181d;">
        <div style="padding: 28px; border-radius: 24px; background: linear-gradient(135deg, #fff5f8 0%, #fff0db 100%); border: 1px solid #f7d5e2;">
          <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #a34767;">Registration Received</p>
          <h2 style="margin: 0; color: #F84988; font-size: 30px;">Thank You for Registering</h2>
          <p style="margin: 14px 0 0; line-height: 1.7; color: #4b3941;">
            Dear ${name}, your Love Never Ends registration has been received. We are honored to support your next step toward healing, restoration, and alignment.
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
          With care,<br />${brandName}
        </p>
      </div>
    `;
  }

  const name = escapeHtml(payload.name);
  const message = formatMultiline(payload.message);
  const brandName = escapeHtml(getBrandName());

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

export const submitContactForm = async (
  body: unknown,
): Promise<JsonResult<ContactResponse>> => {
  try {
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return {
        status: 400,
        body: {
          success: false,
          error: result.error.issues[0]?.message ?? "Invalid contact form payload.",
          message: "Unable to submit the contact form.",
        },
      };
    }

    const payload = result.data as ContactRequest;
    const resend = getResendClient();
    const transporter = resend.emails;
    const brandName = getBrandName();
    const fromAddress = getFromAddress();
    const toAddress = getToAddress();

    await transporter.send({
      from: `${brandName} <${fromAddress}>`,
      to: [toAddress],
      subject:
        payload.title?.trim() || `New Message from ${payload.source?.trim() || "Website"}`,
      html: buildBusinessEmail(payload),
      replyTo: payload.email,
    });

    const customerResult = await transporter
      .send({
        from: `${brandName} <${fromAddress}>`,
        to: [payload.email],
        subject: payload.registrationDetails
          ? "Your Love Never Ends registration was received"
          : `Thanks for contacting ${brandName}`,
        html: buildCustomerEmail(payload),
      })
      .then(() => null)
      .catch((error) => {
        console.error("Confirmation email error:", error);
        return error;
      });

    return {
      status: 200,
      body: {
        success: true,
        message: "Contact form submitted successfully. We will get back to you soon.",
        ...(customerResult
          ? {
              warning:
                "Your message was received, but the confirmation email could not be sent.",
            }
          : {}),
      },
    };
  } catch (error) {
    console.error("Contact form error:", error);

    return {
      status: 500,
      body: {
        success: false,
        message: "Failed to submit contact form. Please try again later.",
        error: "Failed to submit contact form. Please try again later.",
      },
    };
  }
};
