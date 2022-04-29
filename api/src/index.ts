import 'dotenv/config';
import express, {Express, Request, Response} from 'express';
import {connect} from 'mongoose';

import { auth0CheckJWT } from './middleware/auth0CheckJWT';
import { auth0ValidateSession } from './middleware/auth0ValidateSession';
import { configureRoutes } from './routes';

const app: Express = express();
const port: number = Number(process.env.PORT);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send(req.oidc.isAuthenticated() ? 'Bugsplatt!' : 'Not logged in');
});

// TODO: Test when we have the client side implementation in place
app.get('/test', auth0CheckJWT, auth0ValidateSession, (req: Request, res: Response) => {
  res.send(`can access this and authenticated:  ${req._user}`);
});

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
