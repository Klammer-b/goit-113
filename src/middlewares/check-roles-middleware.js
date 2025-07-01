import createHttpError from 'http-errors';
import { ROLES } from '../constants/roles.js';
import { Student } from '../db/models/student.js';

export const checkRolesForStudent = async (req, res, next) => {
  if (req.user.role === ROLES.TEACHER) {
    return next();
  }

  if (req.user.role === ROLES.PARENT) {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    if (!student || !student?.parentId?.equals(req.user._id)) {
      throw createHttpError(403, "It's not your child!");
    }

    return next();
  }

  throw createHttpError(
    500,
    `Can't handle role ${req.user.role} for checkRolesForStudent`,
  );
};
