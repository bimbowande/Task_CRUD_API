import prisma from "./db";

export const createTask = async (title, description, status, dueDate) => {
  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      status,
      dueDate: new Date(dueDate),
    },
  });
  return newTask;
};

export const getAllTask = async () =>
  await prisma.task.findMany({ orderBy: { id: "desc" } });

export const getTaskById = async (id: string) =>
  await prisma.task.findUnique({ where: { id } });

export const updateTaskStatus = async (id: string, status: string) =>
  await prisma.task.update({
    where: { id },
    data: { status },
  });

export const deleteTask = async (id: string) =>
  await prisma.task.delete({
    where: { id },
  });
