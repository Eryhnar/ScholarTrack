import { Router } from "express";
import { updateUserProfile } from "./user-controller.js";
import errorHandler from "../../middlewares/errorHandler.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.put("/profile", auth, updateUserProfile, errorHandler);

export default router;