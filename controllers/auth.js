import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import User from '../models/User.js';

// @desc        Register user
// @routes      POST /api/v1/auth/register
// @access      Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc        Login user
// @routes      POST /api/v1/auth/login
// @access      Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email }).select('password');
  if (!user) {
    return next(new ErrorResponse('Invalid email or password', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid email or password', 401));
  }

  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});

export { loginUser, registerUser };

/**
 * TODO: Add a cookie parser to store user token
 */
