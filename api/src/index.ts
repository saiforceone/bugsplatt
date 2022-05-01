import dotenv from 'dotenv';
console.log(`⚡ [Server]: using env file .env.${process.env.NODE_ENV}.local`);

dotenv.config({
  path: `.env.${process.env.NODE_ENV}.local`,
});

import express, {Express, Request, Response} from 'express';
import {connect} from 'mongoose';

import { configureRoutes } from './routes';
import { configureMiddleware } from './middleware';

const app: Express = express();
const port: number = Number(process.env.PORT);

app.use(express.json());
configureMiddleware(app);

app.get('/', (req: Request, res: Response) => {
  res.json({message: 'ok'});
});

// TODO: Test when we have the client side implementation in place
app.get('/test', (req: Request, res: Response) => {
  res.json({user: req._user});
});

configureRoutes(app);

app.listen(port, async () => {
  console.log(`[Server] (${process.env.NODE_ENV}) Started Bugsplatt on: http://localhost:${port}`);
  // temporary code to connect to mongodb
  try {
    const mongoURI:string = String(process.env.MONGO_DB_URI);
    await connect(mongoURI);
    console.log(`[Server] connected to db: ${mongoURI}`);
  } catch (e) {
    console.log(`[Server] bugsplatt error: `, e);
  }
});
