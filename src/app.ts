import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundError from './app/middlewares/notFoundError';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});


//global error handler
app.use(globalErrorHandler);
//Not found
app.use(notFoundError);

export default app;
