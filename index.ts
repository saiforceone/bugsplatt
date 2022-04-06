import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT);

app.get('/', (req: Request, res: Response) => {
  res.send('Bugsplatt!');
});

app.listen(port, () => {
  console.log(`Started Bugsplatt on port: ${port}`);
});
