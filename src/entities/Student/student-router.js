import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createStudent, getGroupStudentById, getGroupStudents } from "./student-controller.js";

const router = Router();

router.post("/", auth, createStudent, errorHandler);
// router.get("/", auth, getStudents, errorHandler); // to be implemented in the future.
router.get("/:groupId", auth, getGroupStudents, errorHandler);
router.get("/:groupId/:studentId", auth, getGroupStudentById, errorHandler);

export default router;