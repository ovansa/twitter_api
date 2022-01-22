import express from 'express';
import errorHandler from './middleware/error.js';

import tweets from './routes/tweets.js';
import auth from './routes/auth.js';

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(errorHandler);

app.use('/api/v1/tweets', tweets);
app.use('/api/v1/auth', auth);

export default app;
