import 'dotenv/config';
import express, {Express, Request, Response} from 'express';
import {connect} from 'mongoose';
import CommentRouter from './routers/Comment.router';

const app: Express = express();
const port: number = Number(process.env.PORT);

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Bugsplatt!');
});

const commentRouter = new CommentRouter('/comments');
app.use(commentRouter.getRoutes())

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
