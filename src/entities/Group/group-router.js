import { Router } from "express";
import { createGroup, getGroupsByUserId } from "./group-controller.js";
import errorHandler from "../../middlewares/errorHandler.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth, createGroup, errorHandler);
router.get("/", auth, getGroupsByUserId, errorHandler);

export default router;