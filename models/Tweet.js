import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true,
    maxlength: [70, 'Tweet text cannot have more than 50 characters'],
  },
  author_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  geo: {},
});

export default mongoose.model('Tweet', TweetSchema);

/**
 * TODO: Add geo coordinates to tweet model
 * TODO: created_at ISO 8601 date
 * TODO: attachments
 */
