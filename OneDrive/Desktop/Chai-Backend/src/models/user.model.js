import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        fullname : {
            type : String,
            required : true,
            index : true,
            trim : true
        },
        avtar : {
            type: String, // cloudinary url
            required : true
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory : [
            {
                type:Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password : {
            type: String,
            required : [true, 'Password is Required...!!']
        },
        refreshToken: {
            type:String
        }
    },
    {
        timestamps: true
    }
)

// pre hooks
userSchema.pre("save", async function (next) {

    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()

})


// design custom hooks

userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// gnerate access token
userSchema.method.generateAccessToken = function() {
    return jwt.sign(
        {
            _id:this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema)