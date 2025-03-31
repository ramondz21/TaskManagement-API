import { Request, Response } from "express";
import prisma from "../prisma";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({
      message: "User berhasil didaftarkan",
      data: { id: user.id, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan server",
        error: error instanceof Error ? error.message : error,
      });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({ message: "Email atau password salah" });
      return;
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    res.status(200).json({
      message: "User berhasil Login",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan server",
        error: error instanceof Error ? error.message : error,
      });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token tidak tersedia" });
      return;
    }

    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) {
      res.status(403).json({ message: "Refresh token tidak valid" });
      return;
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan server",
        error: error instanceof Error ? error.message : error,
      });
  }
};
