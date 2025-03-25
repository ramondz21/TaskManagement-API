import { Request, Response } from "express";
import prisma from "../prisma";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    const task = await prisma.task.create({
      data: {
        title: title,
        description: description,
        completed: completed ?? false,
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

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const task = await prisma.task.findUnique({
        where: { id: taskId },
      });
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

export const getTasks = async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.findMany();
     res.status(200).json({
      message: "Tasks successfully retrieve",
      data: task,
    });
  } catch (error) {
     res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const editTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const { title, description, completed } = req.body;
    const updateTask = await prisma.task.update({
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
      data: updateTask,
    });
  } catch (error) {
     res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const deleteTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
     res.status(200).json({
      message: "Task successfully deleted",
      data: deleteTask,
    });
  } catch (error) {
     res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error instanceof Error ? error.message : error,
    });
  }
};
