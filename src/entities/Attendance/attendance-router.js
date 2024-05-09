import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { createAttendance } from "./attendance-controller.js";

const router = Router();

router.post("/", auth, createAttendance, errorHandler);

export default router;