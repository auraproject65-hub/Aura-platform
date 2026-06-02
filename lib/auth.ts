import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

// In-memory user store (replace with database later)
const users: any[] = [];

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const createUser = async (email: string, password: string, name: string, companyName: string) => {
  const hashedPassword = await hashPassword(password);
  const user = { id: Date.now().toString(), email, password: hashedPassword, name, companyName, role: 'user' };
  users.push(user);
  return user;
};

export const findUserByEmail = (email: string) => {
  return users.find((u: any) => u.email === email);
};

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
};

export function decodeToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email?: string; name?: string; plan?: string; usage?: number; createdAt?: string; settings?: unknown } | null;
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
