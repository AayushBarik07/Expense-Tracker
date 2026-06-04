const User = require("../models/User");
const jwt = require("jsonwebtoken");

const sanitizeUser = (user) => {
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  // Check if req.body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ 
      message: "Request body is empty or invalid",
    });
  }

  const normalizedFullName = (req.body.fullName || req.body.name || "").trim();
  const normalizedEmail = (req.body.email || "").trim().toLowerCase();
  const normalizedPassword = (req.body.password || "").trim();
  const profileImageUrl = req.body.profileImageUrl || null;

  const missingFields = [];
  if (!normalizedFullName) missingFields.push("fullName");
  if (!normalizedEmail) missingFields.push("email");
  if (!normalizedPassword) missingFields.push("password");

  // validation: check if all required fields are provided
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Please provide all required fields",
      missingFields,
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if(existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //Create new user
    const newUser = await User.create({
      fullName: normalizedFullName,
      email: normalizedEmail,
      password: normalizedPassword,
      profileImageUrl,
    });

    // Return success response with token
    res.status(201).json({
      id: newUser._id,
      user: sanitizeUser(newUser),
      token: generateToken(newUser._id),
    });
  }
  catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  const email = (req.body?.email || "").trim().toLowerCase();
  const password = (req.body?.password || "").trim();
  // validation: check if all fields are provided
  if ( !email || !password ) {
    return res.status(400).json({ message: "All fields are required", missingFields: [!email ? "email" : null, !password ? "password" : null].filter(Boolean) });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials" })
    } 
    res.status(200).json({
      id: user._id,
      user: sanitizeUser(user),
      token: generateToken(user._id),
    });
  }
  catch (err) {
    res.status(500).json({ message: "Error logging in user", error: err.message });
  }
};

//Get user info 
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (err) {
    res.status(500).json({ message: "Error fetching user info", error: err.message });
  }
};