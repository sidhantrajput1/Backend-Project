const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config( { path : './config.env'});

const signToken = (id) => {
  console.log(process.env.JWT_SECRET);

  if(!process.env.JWT_SECRET)

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  const user = await User.create(req.body);

  const token = signToken(user._id);

  res.status(200).json({
    messgae: "User Register Successfully",
    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      messgae: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  res.status(201).json({
    status: "Success",
    messgae : "User login Successfully"
  });
};
