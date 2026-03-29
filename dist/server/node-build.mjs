import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import { Resend } from "resend";
import { z } from "zod";
import crypto from "node:crypto";
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
  source: z.string().trim().optional()
});
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const getResendClient = () => {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(resendApiKey);
};
const getFromAddress = () => process.env.CONTACT_FROM_EMAIL ?? "info@suelynempoweredliving.com";
const getToAddress = () => process.env.CONTACT_TO_EMAIL ?? "info@suelynempoweredliving.com";
const getBrandName = () => process.env.CONTACT_BRAND_NAME ?? "SueLyn Empowered Living";
const buildBusinessEmail = (payload) => {
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
const buildCustomerEmail = (payload) => {
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
const handleContactForm = async (request, response) => {
  try {
    const result = contactSchema.safeParse(request.body);
    if (!result.success) {
      const payload2 = {
        success: false,
        error: result.error.issues[0]?.message ?? "Invalid contact form payload.",
        message: "Unable to submit the contact form."
      };
      return response.status(400).json(payload2);
    }
    const payload = result.data;
    const resend = getResendClient();
    const transporter = resend.emails;
    const brandName = getBrandName();
    const fromAddress = getFromAddress();
    const toAddress = getToAddress();
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
      subject: `Thanks for contacting ${brandName}`,
      html: buildCustomerEmail(payload)
    }).then(() => null).catch((error) => {
      console.error("Confirmation email error:", error);
      return error;
    });
    const responseBody = {
      success: true,
      message: "Contact form submitted successfully. We will get back to you soon.",
      ...customerResult ? { warning: "Your message was received, but the confirmation email could not be sent." } : {}
    };
    return response.json(responseBody);
  } catch (error) {
    console.error("Contact form error:", error);
    const payload = {
      success: false,
      message: "Failed to submit contact form. Please try again later.",
      error: "Failed to submit contact form. Please try again later."
    };
    return response.status(500).json(payload);
  }
};
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 120 * 60 * 1e3;
const readEnv = (name) => {
  const value = process.env[name];
  if (typeof value !== "string") {
    return void 0;
  }
  return value === "" ? void 0 : value;
};
const getAdminPassword = () => readEnv("ADMIN_PASSWORD");
const getSessionSecret = () => readEnv("ADMIN_SESSION_SECRET") ?? readEnv("ADMIN_PASSWORD");
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
const signPayload = (payload) => {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
};
const createSessionToken = (expiresAt) => {
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt }), "utf8").toString(
    "base64url"
  );
  const signature = signPayload(payload);
  if (!signature) {
    throw new Error("Admin session secret is not configured.");
  }
  return `${payload}.${signature}`;
};
const getSessionExpiry = (cookieHeader) => {
  const token = parseCookies(cookieHeader)[SESSION_COOKIE_NAME];
  if (!token) {
    return null;
  }
  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }
  const expectedSignature = signPayload(payload);
  if (!expectedSignature) {
    return null;
  }
  if (signature.length !== expectedSignature.length) {
    return null;
  }
  const isValidSignature = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
  if (!isValidSignature) {
    return null;
  }
  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );
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
const handleAdminLogin = (request, response) => {
  try {
    const adminPassword = getAdminPassword();
    const { password } = request.body ?? {};
    if (!adminPassword) {
      const payload2 = {
        authenticated: false,
        error: "ADMIN_PASSWORD is not configured."
      };
      return response.status(500).json(payload2);
    }
    if (!password) {
      const payload2 = {
        authenticated: false,
        error: "Password is required."
      };
      return response.status(400).json(payload2);
    }
    if (password !== adminPassword) {
      const payload2 = {
        authenticated: false,
        error: "Invalid password."
      };
      return response.status(401).json(payload2);
    }
    const expiresAt = Date.now() + SESSION_DURATION_MS;
    const token = createSessionToken(expiresAt);
    response.setHeader(
      "Set-Cookie",
      buildCookie(token, Math.floor(SESSION_DURATION_MS / 1e3))
    );
    const payload = {
      authenticated: true,
      expiresAt
    };
    return response.json(payload);
  } catch (error) {
    console.error("Admin login error:", error);
    const payload = {
      authenticated: false,
      error: "Unable to start admin session."
    };
    return response.status(500).json(payload);
  }
};
const handleAdminSession = (request, response) => {
  const expiresAt = getSessionExpiry(request.headers.cookie);
  if (!expiresAt) {
    response.setHeader("Set-Cookie", clearCookie());
    const payload2 = {
      authenticated: false
    };
    return response.status(401).json(payload2);
  }
  const payload = {
    authenticated: true,
    expiresAt
  };
  return response.json(payload);
};
const handleAdminLogout = (_request, response) => {
  response.setHeader("Set-Cookie", clearCookie());
  return response.json({ success: true });
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
