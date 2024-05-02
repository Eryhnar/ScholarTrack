import { Router } from 'express';
import authRoutes from './authentication/auth-routes.js';
import userRoutes from './entities/User/user-router.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;