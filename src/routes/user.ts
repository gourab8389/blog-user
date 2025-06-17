import express from 'express';
import { getUserProfile, loginUser, myProfile, updateProfileImage, updateUser } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';
import { uploadFile } from '../middleware/multer.js';

const router = express.Router();

router.post ("/login", loginUser)
router.get("/me", isAuth, myProfile)
router.get("/user/:id", getUserProfile);
router.post("/user/update", isAuth, updateUser);
router.post("/user/update/profile", isAuth, uploadFile, updateProfileImage);

export default router;