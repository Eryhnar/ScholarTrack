import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createMark } from "./mark-controller.js";

const router = Router();

router.post("/:groupId/:taskId/:studentId", auth, createMark, errorHandler);

export default router;