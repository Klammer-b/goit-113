import {
  deleteStudentById,
  getStudentById,
  getStudents,
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

export const deleteStudentController = async (req, res) => {
  const { studentId } = req.params;
  await deleteStudentById(studentId);

  res.status(204).send();
};
