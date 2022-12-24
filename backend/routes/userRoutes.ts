import express from "express"
const router = express.Router()
import protect from "../middlewares/authMiddleware.js"
import { registerUser, authUser, updateUserProfile, updateUserFavorites, removeUserFavorites } from "../controllers/userControllers.js"

router.route("/").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").post(protect, updateUserProfile)
router.route("/profile/favorites/add").post(protect, updateUserFavorites)
router.route("/profile/favorites/remove").post(protect, removeUserFavorites)

export default router