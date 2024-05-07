import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createTask, editTask, getGroupTaskById, getGroupTasks } from "./task-controller.js";

const router = Router();

router.post("/:groupId", auth, createTask, errorHandler);
router.get("/:groupId", auth, getGroupTasks, errorHandler);
router.get("/:groupId/:taskId", auth, getGroupTaskById, errorHandler);
router.put("/:groupId/:taskId", auth, editTask, errorHandler); //group is there to verify that the user can access the info

export default router;
    