import type { RequestHandler } from "express";
import {
  getAdminSessionResponse,
  loginAdmin,
  logoutAdmin,
} from "../lib/admin_auth";

export const handleAdminLogin: RequestHandler = async (request, response) => {
  const result = await loginAdmin(request.body);

  if (result.headers) {
    Object.entries(result.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });
  }

  return response.status(result.status).json(result.body);
};

export const handleAdminSession: RequestHandler = async (request, response) => {
  const result = await getAdminSessionResponse(request.headers.cookie);

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
