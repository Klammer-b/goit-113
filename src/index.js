import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { randomUUID } from 'node:crypto';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';

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

app.get('/', (req, res, next) => {
  res.json({
    message: 'Hello world2!',
    id: req.id,
  });
});
app.get('/', (req, res, next) => {
  res.json({
    message: 'Hello world1!',
    id: req.id,
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

const PORT = getEnvVar(ENV_VARS.PORT);

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
