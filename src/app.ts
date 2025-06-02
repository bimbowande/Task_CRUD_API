import express from "express";
import { Task } from "./model/model";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { createTask } from "./db/query";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

//tasks
const tasks: Task[] = [];

//Create Task
app.post("/api/tasks/create", async (req: any, res: any) => {
  const { title, description, status, dueDate } = req?.body;
  if (!title || !status || !dueDate) {
    return res.status(400).json({ message: " Missing required fields" });
  }

  try {
    const task = await createTask(title, description, status, dueDate);
    if (task) res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }

  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status,
  //     dueDate,
  //   };
  //   tasks.push(task);
  //res.status(201).json(task);
});

//get all tasks
app.get("/api/tasks", (_req, res) => {
  res.json(tasks);
});

// get task by id
app.get("/api/tasks/:id", (req: any, res: any) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.json(tasks);
});

app.patch("/api/tasks/:id", (req: any, res: any) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const { status } = req.body;
  if (!status) return res.status(400).json({ message: "Status is required" });

  task.status = status;
  res.json(tasks);
});

// Delete Task
app.delete("/api/tasks/:id", (req: any, res: any) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  tasks.splice(index, 1);
  res.json(tasks);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`this app is listening at port ${PORT}`));
