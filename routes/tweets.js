import express from 'express';
import { createTweet, getTweet, getTweets } from '../controllers/tweets.js';

const router = express.Router();

import { authorize, protect } from '../middleware/auth.js';

router
  .route('/')
  .get(getTweets)
  .post(protect, authorize('user', 'creator'), createTweet);

router.route('/:id').get(getTweet);

export default router;
