import express from "express";
import { Task } from "./model/model";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTaskStatus,
} from "./db/query";

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
    return res.status(500).json({ error: "Failed to create task" });
  }
});

//get all tasks
app.get("/api/tasks", async (_req, res) => {
  try {
    const alltasks = await getAllTask();
    if (alltasks) return res.json(alltasks);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// get task by id
app.get("/api/tasks/:id", async (req: any, res: any) => {
  //validate if status is given
  if (!req.id) res.status(400).json("Task id is not found");

  //process the request
  try {
    const getATask = await getTaskById(req.id);
    if (getATask) res.json(getATask);
  } catch (err) {
    return res.status(404).json({ messsage: "Task not found" });
  }
});

app.patch("/api/tasks/:id/status", async (req: any, res: any) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id) return res.status(404).json(" Task id is not found");
  if (!status) return res.status(400).json("Task status is not found");

  try {
    const updatedTask = await updateTaskStatus(id, status);
    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update task status" });
  }
});

// Delete Task
app.delete("/api/tasks/:id", async (req: any, res: any) => {
  const { id } = req.params;
  if (!id) return res.status(404).json("task id not found");
  try {
    const deletedTask = await deleteTask(id);
    if (deleteTask)
      return res.status(204).json({ message: "Task succesfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Task failed to deleted" });
  }
});

app.listen(PORT, () => console.log(`this app is listening at port ${PORT}`));
