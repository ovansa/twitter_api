import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import sendEmail from '../utils/sendEmail.js';
import User from '../models/User.js';

// @desc        Register user
// @routes      POST /api/v1/auth/register
// @access      Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });

  sendTokenResponse(user, 200, res);
});

// @desc        Login user
// @routes      POST /api/v1/auth/login
// @access      Public
export const loginUser = asyncHandler(async (req, res, next) => {
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

  sendTokenResponse(user, 200, res);
});

// @desc        Get current user
// @routes      GET /api/v1/auth/me
// @access      Private
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);

  res.status(200).json({ success: true, data: user });
});

// @desc        Forgot Password
// @routes      GET /api/v1/auth/forgotpassword
// @access      Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse(`No user with email`, 404));
  }

  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has 
  requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
