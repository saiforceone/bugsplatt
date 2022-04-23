import 'dotenv/config';
import express, {Express, Request, Response} from 'express';
import {connect} from 'mongoose';

import { configureMiddleware } from './middleware';
import { requireAuthAPI } from './middleware/auth0Middleware';
import { configureRoutes } from './routes';

const app: Express = express();
const port: number = Number(process.env.PORT);

app.use(express.json());
configureMiddleware(app);

app.get('/', (req: Request, res: Response) => {
  res.send(req.oidc.isAuthenticated() ? 'Bugsplatt!' : 'Not logged in');
});

app.get('/test', requireAuthAPI, (req: Request, res: Response) => {
  res.send(`can access this and authenticated:  ${req._user}`);
})

configureRoutes(app);

app.listen(port, async () => {
  console.log(`[Server] Started Bugsplatt on: http://localhost:${port}`);
  // temporary code to connect to mongodb
  try {
    const mongoURI:string = String(process.env.MONGO_DB_URI);
    await connect(mongoURI);
    console.log(`[Server] connected to db: ${mongoURI}`);
  } catch (e) {
    console.log(`[Server] bugsplatt error: `, e);
  }
});
