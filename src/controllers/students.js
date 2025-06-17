import {
  createStudent,
  deleteStudentById,
  getStudentById,
  getStudents,
  updateStudent,
  upsertStudent,
} from '../services/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getStudents();

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
  const student = await createStudent(req.body);

  return res.status(201).json({
    message: `Successfully created student!`,
    status: 201,
    data: student,
  });
};

export const patchStudentController = async (req, res) => {
  const { studentId } = req.params;
  const student = await updateStudent(studentId, req.body);

  return res.json({
    message: `Successfully updated student with id ${studentId}!`,
    status: 200,
    data: student,
  });
};

export const upsertStudentController = async (req, res) => {
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
