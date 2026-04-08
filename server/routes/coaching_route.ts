import type { RequestHandler } from "express";
import { submitCoachingWorkflow } from "../lib/coaching";

export const handleCoachingWorkflow: RequestHandler = async (request, response) => {
  const result = await submitCoachingWorkflow(request.body);
  return response.status(result.status).json(result.body);
};
