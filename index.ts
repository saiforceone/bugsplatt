import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import {connect} from 'mongoose';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT);

app.get('/', (req: Request, res: Response) => {
  res.send('Bugsplatt!');
});

app.listen(port, async () => {
  console.log(`[Server] Started Bugsplatt on port: ${port}`);
  // temporary code to connect to mongodb
  try {
    const mongoURI:string = String(process.env.MONGO_DB_URI);
    await connect(mongoURI);
    console.log(`[Server] connected to db: ${mongoURI}`);
  } catch (e) {
    console.log(`[Server] bugsplatt error: `, e);
  }
});
