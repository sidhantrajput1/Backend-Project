import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import  jwt  from "jsonwebtoken"

export const verifyJwt = asyncHandler(async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer", "")
    
        if (!token) {
            throw new ApiError(401, "unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToekn")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token ")
        }
    
        req.user = user
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
    
})

export {verifyJwt}