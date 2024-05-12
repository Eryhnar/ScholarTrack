import { Router } from "express";
import auth from "../../middlewares/auth.js";
import errorHandler from "../../middlewares/errorHandler.js";
import { archiveStudent, createStudent, deleteStudent, editGroupStudentById, getGroupStudentById, getGroupStudents, getStudentsOverview } from "./student-controller.js";

const router = Router();

router.post("/", auth, createStudent, errorHandler);
// router.get("/", auth, getStudents, errorHandler); // to be implemented in the future.
router.get("/overview/:groupId", auth, getStudentsOverview, errorHandler);
router.get("/:groupId", auth, getGroupStudents, errorHandler);
router.get("/:groupId/:studentId", auth, getGroupStudentById, errorHandler); // the group id is there to verify that the user can access the info
router.put("/:groupId/:studentId", auth, editGroupStudentById, errorHandler); // the group id is there to verify that the user can access the info
router.put("/:groupId/:studentId/archive", auth, archiveStudent, errorHandler); 
router.delete("/:groupId/:studentId", auth, deleteStudent, errorHandler);

export default router;