import { Express } from 'express';
import {auth} from 'express-openid-connect';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.APP_SECRET_KEY,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
}

export const configureMiddleware = (app: Express) => {
  app.use(auth(config));
  console.log(`⚡ [Server]: {Middleware} :: initialized...`);
};
