import express from 'express';
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  registerUser,
} from '../controllers/auth.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);

router.get('/me', protect, getCurrentUser);

export default router;
