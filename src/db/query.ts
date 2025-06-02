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
