const express = require("express")
const { registerUser, authUser, updateUserProfile, updateUserFavorites, removeUserFavorites } = require("../controllers/userControllers")
const router = express.Router()
const { protect } = require("../middlewares/authMiddleware")

router.route("/").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").post(protect, updateUserProfile)
router.route("/profile/favorites/add").post(protect, updateUserFavorites)
router.route("/profile/favorites/remove").post(protect, removeUserFavorites)

module.exports = router