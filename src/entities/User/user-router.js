import { Router } from "express";
import { updateUserProfile } from "./user-controller.js";

const router = Router();

router.put("/settings", updateUserProfile);

export default router;