import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';

//db
import connectDB from './db/connect.js';
//routes
import authRouter from './routes/authRoutes.js';
import booksRouter from './routes/bookRoutes.js';
//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('hello');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', booksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
connectDB();

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer();
