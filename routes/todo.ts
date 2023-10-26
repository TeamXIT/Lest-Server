import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos/todoController"
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { checkRole } from "../middleware/checkRole";
const todo_router: Router = Router()

todo_router.get("/todos", jwtMiddleware, checkRole('user'),getTodos)

todo_router.post("/add-todo", addTodo)

todo_router.put("/edit-todo/:id", updateTodo)

todo_router.delete("/delete-todo/:id", deleteTodo)

export default todo_router