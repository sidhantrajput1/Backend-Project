import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user) {
            res.json({
                success : false , message : "User doesn't exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({success : true, message : 'User logged In Successfully', token})
        } else res.json({success : false, message : 'Invalid credential'})

    } catch (error) {
        console.log(error)
        res.json({
            success : false, message : error.message
        })
    }
}

// Route for Sign up user
const registerUser = async (req, res) => {
    try {
        const {name , email, password} = req.body;

        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                success : false , message : 'User already exist'
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success  :false , message : 'Please enter a valid email'
            })
        }

        if (password.length < 8) {
            return res.json({success : false, message : 'Please enter a strong passord'})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name, email, password: hashPassword
        })

        const user = await newUser.save();
        // console.log(user)

        const token = createToken(user._id)

        res.json({
            success : true, token, message : 'User registered successfully'
        })

    } catch (error) {
        console.log(error)
        res.json({
            success : false, message : error.message
        })
    }
}

// route for admin login
const adminLogin = async (req, res) => {
  try {
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success : true, token})
        } else {
            res.json({
                success : false, message : 'Invalid Credentainal'
            })
        }
  } catch (error) {
    console.log(error)
    res.json({
        success : false, message : error.message
    })
  }
}



export {loginUser, registerUser, adminLogin}