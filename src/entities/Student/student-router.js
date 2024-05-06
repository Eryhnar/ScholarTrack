import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createStudent } from "./student-controller.js";

const router = Router();

router.post("/", auth, createStudent, errorHandler);

export default router;