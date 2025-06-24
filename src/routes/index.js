import { Router } from 'express';
import studentsRouter from './students.js';
import authRouter from './auth.js';

const router = Router();
router.use(studentsRouter);
router.use(authRouter);

export default router;
