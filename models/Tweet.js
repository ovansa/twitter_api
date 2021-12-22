import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [70, 'Message cannot have more than 50 characters'],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Tweet', TweetSchema);
