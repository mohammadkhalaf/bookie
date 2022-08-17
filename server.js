import express from 'express';
const app = express();
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
dotenv.config();
const PORT = process.env.PORT || 5000;
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
//db
import connectDB from './db/connect.js';
//routes
import authRouter from './routes/authRoutes.js';
import booksRouter from './routes/bookRoutes.js';
//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
import authenticateUser from './middleware/auth.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', authenticateUser, booksRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

connectDB();

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer();
