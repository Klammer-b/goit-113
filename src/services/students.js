import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';
import { createPaginationMetadata } from '../utils/create-pagination-metadata.js';

export const getStudents = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filters,
}) => {
  const offset = (page - 1) * perPage;
  const studentFiltersConditions = Student.find();

  if (filters.minAge) {
    studentFiltersConditions.where('age').gte(filters.minAge);
  }

  if (filters.maxAge) {
    studentFiltersConditions.where('age').lte(filters.maxAge);
  }

  if (filters.minAvgMark) {
    studentFiltersConditions.where('avgMark').gte(filters.minAvgMark);
  }

  if (filters.maxAvgMark) {
    studentFiltersConditions.where('avgMark').lte(filters.maxAvgMark);
  }

  if (filters.gender) {
    studentFiltersConditions.where('gender').equals(filters.gender);
  }

  if (typeof filters.onDuty === 'boolean') {
    studentFiltersConditions.where('onDuty').equals(filters.onDuty);
  }

  const [students, studentsCount] = await Promise.all([
    Student.find()
      .merge(studentFiltersConditions)
      .skip(offset)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      }),
    Student.find().merge(studentFiltersConditions).countDocuments(),
  ]);

  const metadata = createPaginationMetadata(page, perPage, studentsCount);

  return { students, ...metadata };
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
