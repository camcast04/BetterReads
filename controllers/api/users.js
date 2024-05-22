// betterreads/controllers/api/users.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken
};

async function create(req, res) {
  try {
    console.log('create function called');
    console.log('Request body:', req.body);
    const user = await User.create(req.body);
    console.log('User created:', user);
    const token = createJWT(user);
    console.log('Token created:', token);
    res.json(token);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    console.log('Logging in user:', req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('User not found');
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error('Invalid password');
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ message: err.message });
  }
}

function checkToken(req, res) {
  console.log('checkToken - req.user:', req.user);
  res.json(req.user);
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
