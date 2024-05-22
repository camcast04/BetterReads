// better-reads/controllers/api/users.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  createList,
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
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

async function createList(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    user.lists.push({ name: req.params.listName });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Error creating list:', err);
    res.status(400).json({ message: err.message });
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
}
