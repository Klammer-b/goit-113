import { Router } from 'express';
import studentsRouter from './students.js';

const router = Router();
router.use(studentsRouter);

export default router;
