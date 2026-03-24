/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  phone?: string;
  title?: string;
  source?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  warning?: string;
  error?: string;
}

export interface AdminLoginRequest {
  password: string;
}

export interface AdminSessionResponse {
  authenticated: boolean;
  expiresAt?: number;
  error?: string;
}
