import { Express } from 'express';
import { auth0CheckJWT } from './auth0CheckJWT';
import { auth0ValidateSession } from './auth0ValidateSession';
import logger from '../utils/logger.util';

export const configureMiddleware = (app: Express) => {
  app.use([auth0CheckJWT, auth0ValidateSession]);
  logger.info(`⚡ [Server]: {Middleware} :: initialized...`);
};
