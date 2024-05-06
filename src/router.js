import { Router } from 'express';
import authRoutes from './authentication/auth-routes.js';
import userRoutes from './entities/User/user-router.js';
import groupRoutes from './entities/Group/group-router.js';
import studentRoutes from './entities/Student/student-router.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/group', groupRoutes);
router.use("/student", studentRoutes);

export default router;