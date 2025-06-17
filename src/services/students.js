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

export const updateStudent = async (studentId, payload) => {
  const student = await Student.findOneAndUpdate({ _id: studentId }, payload, {
    new: true,
  });

  if (!student) {
    throw createHttpError(404, 'Student not found!');
  }

  return student;
};

export const upsertStudent = async (studentId, payload) => {
  const student = await Student.findById(studentId);

  if (student) {
    student.set(payload);
    return { isNew: false, student: await student.save() };
  } else {
    return { isNew: true, student: await Student.create(payload) };
  }
};

export const deleteStudentById = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};
