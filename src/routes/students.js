import { Router } from 'express';
import {
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
} from '../controllers/students.js';

const studentsRouter = Router();

studentsRouter.get('/students', getStudentsController);

studentsRouter.get('/students/:studentId', getStudentByIdController);

studentsRouter.delete('/students/:studentId', deleteStudentController);

export default studentsRouter;
