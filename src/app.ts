import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundError from './app/middlewares/notFoundError';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});


//global error handler
app.use(globalErrorHandler);
//Not found
app.use(notFoundError);

export default app;
