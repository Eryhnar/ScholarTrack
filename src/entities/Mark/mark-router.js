import { Router } from "express";
import auth from "../../middlewares/auth";
import errorHandler from "../../middlewares/errorHandler";

const router = Router();

router.post("/", auth, createMark, errorHandler);

export default router;