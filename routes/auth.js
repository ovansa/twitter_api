import express from 'express';
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  registerUser,
  resetPassword,
  updateDetails,
  updatePassword,
} from '../controllers/auth.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/update', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

router.get('/me', protect, getCurrentUser);

export default router;
