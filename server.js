import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';

//db
import connectDB from './db/connect.js';

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('hello');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
