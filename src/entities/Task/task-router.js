import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createTask } from "./task-controller.js";

const router = Router();

router.post("/:groupId", auth, createTask, errorHandler);

export default router;
    