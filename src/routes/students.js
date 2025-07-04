import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  uploadStudentsAvatarController,
  upsertStudentController,
} from '../controllers/students.js';
import { validateMongoDBId } from '../middlewares/validate-mongo-id.js';
import { validateBody } from '../middlewares/validate-body-middleware.js';
import { createStudentValidationSchema } from '../validation/create-student-validation-schema.js';
import { updateStudentValidationSchema } from '../validation/update-student-validation-schema.js';
import { authenticate } from '../middlewares/authenticate-middleware.js';
import { checkRolesForStudent } from '../middlewares/check-roles-middleware.js';
import { upload } from '../middlewares/upload-files.js';

const studentsRouter = Router();
studentsRouter.use('/students', authenticate);

studentsRouter.use(
  '/students/:studentId',
  validateMongoDBId('studentId'),
  checkRolesForStudent,
);

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
studentsRouter.post(
  '/students/:studentId/upload-avatar',
  upload.single('avatarUrl'),
  uploadStudentsAvatarController,
);

studentsRouter.put(
  '/students/:studentId',
  validateBody(createStudentValidationSchema),
  upsertStudentController,
);
studentsRouter.delete('/students/:studentId', deleteStudentController);

export default studentsRouter;
