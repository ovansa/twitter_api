import express from 'express';
import { createTweet, getTweet, getTweets } from '../controllers/tweets.js';

const router = express.Router();

router.route('/').get(getTweets).post(createTweet);

router.route('/:id').get(getTweet);

export default router;
