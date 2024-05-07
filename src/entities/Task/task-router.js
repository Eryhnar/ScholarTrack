import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createTask, getGroupTaskById, getGroupTasks } from "./task-controller.js";

const router = Router();

router.post("/:groupId", auth, createTask, errorHandler);
router.get("/:groupId", auth, getGroupTasks, errorHandler);
router.get("/:groupId/:taskId", auth, getGroupTaskById, errorHandler);

export default router;
    