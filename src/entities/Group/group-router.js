import { Router } from "express";
import { createGroup, editOwnGroupById, getOwnGroups } from "./group-controller.js";
import errorHandler from "../../middlewares/errorHandler.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", auth, createGroup, errorHandler);
router.get("/", auth, getOwnGroups, errorHandler);
router.put("/:groupId", auth, editOwnGroupById, errorHandler);

export default router;