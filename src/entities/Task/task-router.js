import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";

const router = Router();

router.get("/:groupId", auth, createTask, errorHandler);

export default router;
    