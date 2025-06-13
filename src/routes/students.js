import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';

const studentsRouter = Router();

studentsRouter.get('/students', getStudentsController);

studentsRouter.get('/students/:studentId', getStudentByIdController);

studentsRouter.post('/students', createStudentController);

studentsRouter.patch('/students/:studentId', patchStudentController);

studentsRouter.put('/students/:studentId', upsertStudentController);

studentsRouter.delete('/students/:studentId', deleteStudentController);

export default studentsRouter;
