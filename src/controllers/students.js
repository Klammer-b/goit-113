import { ROLES } from '../constants/roles.js';
import {
  createStudent,
  deleteStudentById,
  getStudentById,
  getStudents,
  updateStudent,
  uploadStudentsAvatar,
  upsertStudent,
} from '../services/students.js';
import {
  parseFilters,
  parsePaginationParams,
  parseSortParams,
} from '../utils/parse-helpers.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filters = parseFilters(req.query);
  if (req.user.role === ROLES.PARENT) {
    filters.parentId = req.user._id;
  }

  const students = await getStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters,
  });

  res.json({
    message: 'Successfully retrieved students!',
    status: 200,
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  res.json({
    message: `Successfully retrieved student with id ${studentId}!`,
    status: 200,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  // todo move to helper or service layer
  if (req.body.firstName && req.body.lastName) {
    req.body.name = req.body.firstName + ' ' + req.body.lastName;
  }
  const student = await createStudent({
    ...req.body,
    parentId: req.body.parentId ?? req.user._id,
  });

  return res.status(201).json({
    message: `Successfully created student!`,
    status: 201,
    data: student,
  });
};

export const patchStudentController = async (req, res) => {
  if (req.body.firstName && req.body.lastName) {
    req.body.name = req.body.firstName + ' ' + req.body.lastName;
  }
  const { studentId } = req.params;
  const student = await updateStudent(studentId, req.body);

  return res.json({
    message: `Successfully updated student with id ${studentId}!`,
    status: 200,
    data: student,
  });
};

export const uploadStudentsAvatarController = async (req, res) => {
  const { studentId } = req.params;
  const student = await uploadStudentsAvatar(studentId, req.file);

  return res.json({
    message: `Successfully updated students avatar with id ${studentId}!`,
    status: 200,
    data: student,
  });
};

export const upsertStudentController = async (req, res) => {
  if (req.body.firstName && req.body.lastName) {
    req.body.name = req.body.firstName + ' ' + req.body.lastName;
  }
  const { studentId } = req.params;
  const { student, isNew } = await upsertStudent(studentId, req.body);

  const status = isNew ? 201 : 200;

  return res.status(status).json({
    message: `Successfully updated student with id ${studentId}!`,
    status,
    data: student,
  });
};

export const deleteStudentController = async (req, res) => {
  const { studentId } = req.params;
  await deleteStudentById(studentId);

  res.status(204).send();
};
