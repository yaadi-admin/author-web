import type { RequestHandler } from "express";
import {
  getAdminSessionResponse,
  loginAdmin,
  logoutAdmin,
} from "../lib/admin_auth";

export const handleAdminLogin: RequestHandler = (request, response) => {
  const result = loginAdmin(request.body);

  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }

  return response.status(result.status).json(result.body);
};

export const handleAdminSession: RequestHandler = (request, response) => {
  const result = getAdminSessionResponse(request.headers.cookie);

  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }

  return response.status(result.status).json(result.body);
};

export const handleAdminLogout: RequestHandler = (_request, response) => {
  const result = logoutAdmin();

  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }

  return response.status(result.status).json(result.body);
};
