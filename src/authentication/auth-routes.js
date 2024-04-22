import { Router } from 'express';
import { register } from './auth-controller.js';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

// router.post('/login', login);
router.post('/register', register, errorHandler);

export default router;