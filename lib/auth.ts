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
  const user = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    name,
    companyName,
    role: 'user',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
};

export const findUserByEmail = (email: string) => {
  return users.find((u: any) => u.email === email);
};

export const generateToken = (userId: string, email: string, role = 'user') => {
  return jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email?: string; role?: string };
  } catch {
    return null;
  }
};

export const isAdmin = (email: string) => {
  return email === 'edwin@aura.ai' || email === 'admin@aura.ai' || email === 'owusueddie1@gmail.com';
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

// Seed an admin user for demo/testing purposes if not already present
const ADMIN_EMAIL = 'owusueddie1@gmail.com';
const ADMIN_PLAIN = 'pintogee12';
if (!users.find((u: any) => u.email === ADMIN_EMAIL)) {
  const hashed = bcrypt.hashSync(ADMIN_PLAIN, 12);
  users.push({ id: 'admin-1', email: ADMIN_EMAIL, password: hashed, name: 'AURA Admin', companyName: 'AURA', role: 'admin' });
}
