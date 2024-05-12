import { Router } from 'express';
import authRoutes from './authentication/auth-routes.js';
import userRoutes from './entities/User/user-router.js';
import groupRoutes from './entities/Group/group-router.js';
import studentRoutes from './entities/Student/student-router.js';
import taskRoutes from './entities/Task/task-router.js';
import markRoutes from './entities/Mark/mark-router.js';
import attendanceRoutes from './entities/Attendance/attendance-router.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/group', groupRoutes);
router.use("/student", studentRoutes);
router.use("/task", taskRoutes);
router.use("/mark", markRoutes);
router.use("/attendance", attendanceRoutes);

export default router;