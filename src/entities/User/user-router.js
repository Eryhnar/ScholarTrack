import { Router } from "express";
import { changePassword, updateUserProfile } from "./user-controller.js";
import errorHandler from "../../middlewares/errorHandler.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.put("/profile", auth, updateUserProfile, errorHandler);
router.put("/profile/password", auth, changePassword, errorHandler);

export default router;