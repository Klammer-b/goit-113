import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';

export const getStudents = async () => {
  const students = await Student.find();

  return students;
};

export const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found!');
  }

  return student;
};

export const createStudent = async (payload) => {
  const student = await Student.create(payload);

  return student;
};

export const updateStudent = async (studentId, payload, options) => {
  const result = await Student.findOneAndUpdate({ _id: studentId }, payload, {
    ...options,
    new: true,
    includeResultMetadata: true,
    runValidators: true,
  });

  if (!result.value) {
    throw createHttpError(404, 'Student not found!');
  }

  return {
    student: result.value,
    isNew: !result.lastErrorObject.updatedExisting,
  };
};

export const deleteStudentById = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};
