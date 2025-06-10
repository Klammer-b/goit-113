import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import router from './routes/index.js';
import { notFoundMiddleware } from './middlewares/not-found-middleware.js';
import { requestIdMiddleware } from './middlewares/request-id-middleware.js';
import { errorHandlerMiddleware } from './middlewares/error-handler-middleware.js';

export const startServer = () => {
  const app = express();

  app.use(cors(), pino(), requestIdMiddleware);

  app.use(router);

  app.use(errorHandlerMiddleware);

  app.use(notFoundMiddleware);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
  });
};
