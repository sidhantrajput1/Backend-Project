
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadCloudnary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiError.js"



const registerUser = asyncHandler (async (req, res ) => {
    // get user details from fronted
    // validation not empty
    // check if user all ready registers/exists : usrname , email 
    // check for image / check for avatar 
    // upload them to cloudinary , avatar
    // create user object - create object in db
    // remove password and refressh token field from response
    // check for user creation
    // return res

    const {fullname , email , password, username} = req.body 
    // console.log("email ", email);

    // if(fullname === "") {
    //     throw new ApiError(400, "Full Name is required ")
    // }

    if(
        [fullname, email , password, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Full Name is required ")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or Username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required!!")
    }
    console.log("avatar iamge ",avatarLocalPath);

    const coverImageLocalPath = req.files?.coverImage[0]?.path

    const avatar = await uploadCloudnary(avatarLocalPath)
    const coverImage = await uploadCloudnary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user ")
    }

    return res.status(201).json(
        new ApiResponse( 200, createUser, " User Registered Successfully " )
    )
}) 


export {registerUser}