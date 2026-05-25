import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export function createToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function decodeToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email?: string; exp?: number };
  } catch {
    return null;
  }
}

export function getEmailFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )auth-token=([^;]+)/);
  if (!match) return null;
  const token = decodeURIComponent(match[1]);
  const payload = decodeToken(token);
  return payload?.email || null;
}
