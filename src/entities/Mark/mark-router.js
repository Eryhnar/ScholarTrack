import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createMark, editStudentMark, getAllGroupMarks } from "./mark-controller.js";

const router = Router();

router.post("/:groupId/:taskId/:studentId", auth, createMark, errorHandler);
//get all marks of a group
router.get("/:groupId", auth, getAllGroupMarks, errorHandler);
//get all marks of a task future implementation
//get all marks of a student future implementation
router.put("/:groupId/:markId", auth, editStudentMark, errorHandler);

export default router;