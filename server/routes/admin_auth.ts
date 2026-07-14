import type { RequestHandler } from "express";
import {
  getAdminSessionResponse,
  loginAdmin,
  logoutAdmin,
} from "../lib/admin_auth";

const getClientKey = (request: {
  headers: Record<string, unknown>;
  ip?: string;
}) => {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  if (Array.isArray(forwarded) && forwarded[0]) {
    return String(forwarded[0]);
  }

  return request.ip || "unknown";
};

const applyResult = (
  response: {
    setHeader: (name: string, value: string) => void;
    status: (code: number) => { json: (body: unknown) => unknown };
  },
  result: {
    status: number;
    body: unknown;
    headers?: Record<string, string>;
  },
) => {
  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }

  return response.status(result.status).json(result.body);
};

export const handleAdminLogin: RequestHandler = async (request, response) => {
  const result = await loginAdmin(request.body, {
    clientKey: getClientKey(request),
  });

  return applyResult(response, result);
};

export const handleAdminSession: RequestHandler = async (request, response) => {
  const renew = request.query.renew === "1" || request.query.renew === "true";
  const result = await getAdminSessionResponse(request.headers.cookie, {
    renew,
  });

  return applyResult(response, result);
};

export const handleAdminLogout: RequestHandler = (_request, response) => {
  const result = logoutAdmin();
  return applyResult(response, result);
};
