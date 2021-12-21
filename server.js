import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import errorHandler from './middleware/error.js';
import { connectDB } from './config/db.js';

import tweets from './routes/tweets.js';
import auth from './routes/auth.js';

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tweets', tweets);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.status(400).json({ success: false });
});

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  server.close(() => process.exit(1));
});
