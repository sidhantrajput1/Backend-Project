
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadCloudnary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessTokenAndRefereshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToekn = user.generateRefreshToken()

        user.refreshToekn = refreshToekn
        user.save({ validateBeforeSave : false })

        return { accessToken , refreshToekn }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Access and refresh token")
    }
}

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

    if(
        [fullname, email , password, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Full Name is required ")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or Username already exists")
    }

    // console.log(req.files);
    

    const avatarLocalPath = req.files?.avatar[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required!!")
    }

    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    } 

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

const loginUser = asyncHandler (async (req, res) => {
    // take the data from req.body

    const { email, username , password } = req.body

    // validate the user using email aur username 

    if ( !email || !username ) {
        throw new ApiError(400, "Username and password is required for login")
    }

    // find the user

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user) {
        throw new ApiError(404, "User does not exists")
    }

    // password check 

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(402, "Password is Wrong")
    }

    // send accessToken and refreshToekn 

    const {refreshToekn,accessToken} = await generateAccessTokenAndRefereshToken(user._id)

    // send cookies

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options )
    .cookie("refreshToken", refreshToekn, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, refreshToekn, accessToken
            },
            "User logged In Sucessfully"
        )
    )


})

const logoutUser = asyncHandler(async (req, res) => {
    // req.user._id

    await User.findByIdAndUpdate(req.user._id , 
        {
            $set : {
                refreshToekn  : undefined
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken ", options)
    .clearCookie("refreshToekn", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


export {
    registerUser,
    loginUser,
    logoutUser
}