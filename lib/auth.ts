import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

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

export const generateToken = (userId: string, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch {
    return null;
  }
};
