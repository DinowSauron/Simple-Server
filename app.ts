//process.stdout.write('\x1B[2J\x1B[0f');
//console.log("SERVER LOG:");
import express, { Request, Response } from 'express';
import routes from './src/routes';
import cors from 'cors';
import { exceptionHandler } from './src/middlewares/errorHandler';

const app = express();
const PORT = 3005;
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(routes);

app.use(exceptionHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
