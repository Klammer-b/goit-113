import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { randomUUID } from 'node:crypto';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { Student } from './db/models/student.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res, next) => {
    req.id = randomUUID();
    next();
    // next(new Error('Test error'));
  });

  app.get('/students', async (req, res) => {
    const data = await Student.find();
    res.json({
      message: 'Successfully retrieved students!',
      status: 200,
      data,
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: `Student with id ${studentId} not found!`,
        status: 404,
      });
    }

    res.json({
      message: `Successfully retrieved student with id ${studentId}!`,
      status: 200,
      data: student,
    });
  });

  app.use((error, req, res, next) => {
    res.json({
      errorMessage: error.message,
      id: req.id,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not Found',
      status: 404,
    });
  });

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
  });
};
