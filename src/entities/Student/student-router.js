import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createStudent } from "./student-controller.js";

const router = Router();

router.post("/", auth, createStudent, errorHandler);
// router.get("/", auth, getStudents, errorHandler); // to be implemented in the future.
// router.get("/:groupId", auth, getGroupStudents, errorHandler);

export default router;