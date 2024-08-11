import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannleProfile, getwatchHistory } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJwt } from "../middlewares/auth.middlewares.js";


const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser
)

router.route('/login').post(loginUser)

// Secured routes

router.route('/logout').post(verifyJwt ,logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/change-password').post(verifyJwt, changeCurrentPassword)
router.route('/current-user').get(verifyJwt, getCurrentUser)
router.route('/update-account').patch(verifyJwt, updateAccountDetails)
router.route('/avatar').patch(verifyJwt, upload.single("avatar"), updateUserAvatar)
router.route('/cover-imgage').patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage)
router.route('/c/:username').get(verifyJwt, getUserChannleProfile)
router.route('/watch-history').get(verifyJwt, getwatchHistory)

export default router