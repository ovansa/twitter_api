import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [70, 'Message cannot have more than 50 characters'],
  },
});

export default mongoose.model('Tweet', TweetSchema);