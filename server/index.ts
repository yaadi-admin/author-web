import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContactForm } from "./routes/contact_route";
import {
  handleAdminLogin,
  handleAdminLogout,
  handleAdminSession,
} from "./routes/admin_auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/demo", handleDemo);

  // Contact form route
  app.post("/api/contact", handleContactForm);
  app.post("/api/admin/login", handleAdminLogin);
  app.get("/api/admin/session", handleAdminSession);
  app.post("/api/admin/logout", handleAdminLogout);

  return app;
}
