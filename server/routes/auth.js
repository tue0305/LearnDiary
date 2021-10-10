const express = require(`express`);
const router = express.Router();
const argon2 = require(`argon2`);
const jwt = require(`jsonwebtoken`);
const verifyToken = require(`../middleware/auth`)

const User = require(`../models/User`);



// @route GET api/auth
// @des Check if user is logged in
// @acess Public
router.get(`/`, verifyToken, async (req, res) => {
  // simple validation
  try {
    const user = await User.findById(req.userId).select(`-password`)
    if(!user) return res.status(400).json({success:false, message:`User not found!`})


    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

// @route POST api/auth/register
// @desc Register user
// @acess Public
router.post(`/register`, async (req, res) => {
  const { username, password } = req.body;

  // simple validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: `Missing username or password!`,
    });
  }
  try {
    // check existing user
    const user = await User.findOne({ username: username });
    if (user)
      return res.status(400).json({
        success: false,
        message: `Username already taken!`,
      });

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    // return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: `User created successfully!`,
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

// @route POST api/auth/login
// @desc Login user
// @acess Public
router.post(`/login`, async (req, res) => {
  const { username, password } = req.body;
  // simple validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: `Missing username or password!`,
    });
  }
  try {
    //check existing user
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: `Incorrect user!`,
      });

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: `Incorrect password!`,
      });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({ success: true, message: `Login successfully!`, accessToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

module.exports = router;
