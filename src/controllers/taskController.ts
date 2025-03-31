import { Request, Response } from "express";
import prisma from "../prisma";

export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.user!.id;

    const task = await prisma.task.create({
      data: {
        title: title,
        description: description,
        completed: completed ?? false,
        userId,
      },
    });
    res.status(201).json({
      message: "Task berhasil dibuat",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = parseInt(req.params.taskId);
    const userId = req.user!.id;

    const task = await prisma.task.findUnique({
      where: { id: taskId, userId },
    });

    if (!task) {
      res.status(404).json({ message: "Task tidak ditemukan" });
      return;
    }

    res.status(200).json({
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const tasks = await prisma.task.findMany({
      where: { userId }, // Hanya ambil task milik user yang sedang login
    });
    res.status(200).json({
      message: "Tasks successfully retrieve",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const editTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = parseInt(req.params.taskId);
    const { title, description, completed } = req.body;
    const userId = req.user!.id;

    // Pastikan hanya pemilik task yang bisa update
    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      res
        .status(404)
        .json({ message: "Task tidak ditemukan atau bukan milik Anda" });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: title,
        description: description,
        completed: completed,
      },
    });
    res.status(200).json({
      message: "Task successfully updated",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = parseInt(req.params.taskId);
    const userId = req.user!.id;

    // Pastikan hanya pemilik task yang bisa menghapus
    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      res
        .status(404)
        .json({ message: "Task tidak ditemukan atau bukan milik Anda" });
      return;
    }

    await prisma.task.delete({ where: { id: taskId } });

    res.json({ message: "Task berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error instanceof Error ? error.message : error,
    });
  }
};
