
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadCloudnary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"




const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
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
    console.log(email);
    

    // validate the user using email aur username 

    if (!password || (!username && !email)) {
        throw new ApiError(400, "username or email is required")
    }

    // find the user
    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }


    // password check 

    const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    // send accessToken and refreshToekn 

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    // send cookies

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
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


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =req.cookies.refreshToekn || req.body.refreshToekn

    if (incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        )
    
        const user = User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("refreshToken", newRefreshToken)
        .cookie("accessToken", accessToken)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToekn: newRefreshToken},
                "Accessed Token Refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token")
    }
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}