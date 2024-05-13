import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createMark, deleteStudentMark, editStudentMark, getAllGroupMarks } from "./mark-controller.js";

const router = Router();

router.post("/:groupId/:taskId/:studentId", auth, createMark, errorHandler);
router.get("/:groupId", auth, getAllGroupMarks, errorHandler);
router.put("/:groupId/:markId", auth, editStudentMark, errorHandler);
router.delete("/:groupId/:markId", auth, deleteStudentMark, errorHandler);

export default router;