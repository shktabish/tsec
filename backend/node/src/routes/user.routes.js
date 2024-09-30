import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getCurrentUser, 
    getUserById, 
    updateUserProfile 
} from "../controllers/user.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public routes
router.post('/register', upload.single('avatar'), registerUser);

router.post('/login', loginUser);

// Secured routes
router.get('/logout', verifyJWT, logoutUser);
router.get('/current-user', verifyJWT, getCurrentUser);

// User-specific routes
router.get('/:id', verifyJWT, getUserById); // Get user by ID
router.put('/profile', verifyJWT, updateUserProfile); // Update user profile

export default router;
