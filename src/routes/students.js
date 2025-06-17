import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { validateMongoDBId } from '../middlewares/validate-mongo-id.js';
import { validateBody } from '../middlewares/validate-body-middleware.js';
import { createStudentValidationSchema } from '../validation/create-student-validation-schema.js';
import { updateStudentValidationSchema } from '../validation/update-student-validation-schema.js';

const studentsRouter = Router();

studentsRouter.use('/students/:studentId', validateMongoDBId('studentId'));

studentsRouter.get('/students', getStudentsController);
studentsRouter.get('/students/:studentId', getStudentByIdController);
studentsRouter.post(
  '/students',
  validateBody(createStudentValidationSchema),
  createStudentController,
);
studentsRouter.patch(
  '/students/:studentId',
  validateBody(updateStudentValidationSchema),
  patchStudentController,
);
studentsRouter.put(
  '/students/:studentId',
  validateBody(createStudentValidationSchema),
  upsertStudentController,
);
studentsRouter.delete('/students/:studentId', deleteStudentController);

export default studentsRouter;
