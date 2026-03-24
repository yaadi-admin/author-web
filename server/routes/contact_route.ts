import type { RequestHandler } from "express";
import { Resend } from "resend";
import { z } from "zod";
import type { ContactRequest, ContactResponse } from "@shared/api";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("A valid email address is required."),
  message: z.string().trim().min(1, "Message is required."),
  phone: z.string().trim().optional(),
  title: z.string().trim().optional(),
  source: z.string().trim().optional(),
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
  process.env.CONTACT_TO_EMAIL ?? "info@suelynempoweredliving.com";

const getBrandName = () =>
  process.env.CONTACT_BRAND_NAME ?? "SueLyn Empowered Living";

const buildBusinessEmail = (payload: ContactRequest) => {
  const title = escapeHtml(payload.title?.trim() || "New Contact Message");
  const source = escapeHtml(payload.source?.trim() || "website");
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const phone = escapeHtml(payload.phone?.trim() || "Not provided");
  const message = escapeHtml(payload.message).replace(/\n/g, "<br />");

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
  const name = escapeHtml(payload.name);
  const message = escapeHtml(payload.message).replace(/\n/g, "<br />");
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

export const handleContactForm: RequestHandler = async (request, response) => {
  try {
    const result = contactSchema.safeParse(request.body);

    if (!result.success) {
      const payload: ContactResponse = {
        success: false,
        error: result.error.issues[0]?.message ?? "Invalid contact form payload.",
        message: "Unable to submit the contact form.",
      };
      return response.status(400).json(payload);
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
        subject: `Thanks for contacting ${brandName}`,
        html: buildCustomerEmail(payload),
      })
      .then(() => null)
      .catch((error) => {
        console.error("Confirmation email error:", error);
        return error;
      });

    const responseBody: ContactResponse = {
      success: true,
      message: "Contact form submitted successfully. We will get back to you soon.",
      ...(customerResult
        ? { warning: "Your message was received, but the confirmation email could not be sent." }
        : {}),
    };

    return response.json(responseBody);
  } catch (error) {
    console.error("Contact form error:", error);

    const payload: ContactResponse = {
      success: false,
      message: "Failed to submit contact form. Please try again later.",
      error: "Failed to submit contact form. Please try again later.",
    };

    return response.status(500).json(payload);
  }
};
