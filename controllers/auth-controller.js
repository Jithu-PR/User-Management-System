const bcrypt = require('bcryptjs');
const Yup = require('yup');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const passwordValidationSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Password must contain at least one special character',
  )
  .required('Password is required');

//register
const registerUser = async (req, res) => {
  const { userName, email, password, gender, dob, country } = req.body;

  if (userName && email && password && gender && dob && country) {
    try {
      try {
        await passwordValidationSchema.validate(password);
      } catch (error) {
        return res.json({
          success: false,
          message: error.message,
        });
      }
      const checkUser = await User.findOne({ email });
      if (checkUser)
        return res.json({
          success: false,
          message: 'User Already Exists with the same email! Please try again.',
        });

      const hashpassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        userName,
        email,
        password: hashpassword,
        gender,
        dob,
        country,
      });

      await newUser.save();
      res.status(200).json({
        success: true,
        message: 'Registration successfull',
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: 'Some error has occured',
      });
    }
  } else return res.json({ success: false, message: 'All fields required' });
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: 'Incorrect Email or Password! Please try again',
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password,
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: 'Incorrect Email or Password! Please try again',
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      'CLIENT_SECRET_KEY',
      { expiresIn: '60m' },
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        email: checkUser.email,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error has occured',
    });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out successfully',
  });
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user',
    });

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized user',
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
