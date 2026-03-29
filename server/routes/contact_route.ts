import type { RequestHandler } from "express";
import { submitContactForm } from "../lib/contact";

export const handleContactForm: RequestHandler = async (request, response) => {
  const result = await submitContactForm(request.body);
  return response.status(result.status).json(result.body);
};
