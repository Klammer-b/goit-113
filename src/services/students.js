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

export const deleteStudentById = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};
