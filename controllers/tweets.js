import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Tweet from '../models/Tweet.js';

// @desc        Create a tweet
// @routes      POST /api/v1/tweets
// @access      Public
const createTweet = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const tweet = await Tweet.create(req.body);
  res.status(200).json({ success: true, tweet });
});

// @desc        Get all tweets
// @routes      GET /api/v1/tweets
// @access      Public
const getTweets = asyncHandler(async (req, res, next) => {
  const tweets = await Tweet.find();
  res.status(200).json({ success: true, data: tweets });
});

// @desc        Get single tweet
// @routes      GET /api/v1/tweets/:id
// @access      Public
const getTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return next(
        new ErrorResponse(`Tweet not found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: tweet });
  } catch (err) {
    next(err);
  }
};

export { createTweet, getTweet, getTweets };
