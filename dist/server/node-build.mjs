import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import { Resend } from "resend";
import { z } from "zod";
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
