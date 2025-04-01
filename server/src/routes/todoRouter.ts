import { Router } from "express";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todoController";

const router = Router();

router.post("/create", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodo);
router.delete("/delete/:id",deleteTodo);
router.put("/update/:id",updateTodo);
export default router;

