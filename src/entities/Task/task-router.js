import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createTask, getGroupTasks } from "./task-controller.js";

const router = Router();

router.post("/:groupId", auth, createTask, errorHandler);
router.get("/:groupId", auth, getGroupTasks, errorHandler);

export default router;
    