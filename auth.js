const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user in the database
    const user = await User.findOne({ username });
    
    // Check if user exists and password matches
    if (user && user.password === password) {
      return res.status(200).json({ 
        success: true,
        user: { username: user.username }
      });
    }
    
    res.status(401).json({ 
      success: false,
      message: 'Invalid credentials'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }
    
    // Create new user
    const user = await User.create({
      username,
      password // In a real app, you would hash the password before saving
    });
    
    res.status(201).json({
      success: true,
      user: { username: user.username }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  login,
  register
}; 