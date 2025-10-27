const User = require('../models/userModel');

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({ name, email, password });
    console.log('New user created:', newUser);

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (err) {
    console.error('Error in registration:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({
      message: 'Login successful',
      user
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Logout

const logoutUser = async (req, res) => {
  try {
   
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.log("Error in logout:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
