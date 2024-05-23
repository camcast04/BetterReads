// better-reads/controllers/api/users.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Book = require('../../models/book');
const List = require('../../models/list');
const axios = require('axios');

module.exports = {
  create,
  login,
  createList,
  addBookToList,
  updateUser,
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);

    const defaultLists = ['Read', 'To Read', 'DNF', 'Favorites'].map(listName => ({
      listName,
      user: user._id,
      books: [],
      is_default: true
    }));

    const createdLists = await List.insertMany(defaultLists);

    user.lists = createdLists.map(list => list._id);
    await user.save();

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
    if (!user) throw new Error('User not found');

    const newList = new List({
      listName: req.params.listName,
      user: user._id,
      books: [],
    });

    if (req.body.bookId) {
      const book = await Book.findById(req.body.bookId);
      if (!book) throw new Error('Book not found');
      newList.books.push(book);
    }

    await newList.save();
    user.lists.push(newList._id);
    await user.save();

    console.log('New list created:', newList);
    console.log('User updated with new list:', user);

    res.json(user);
  } catch (err) {
    console.error('Error creating list:', err);
    res.status(400).json({ message: err.message });
  }
}

async function addBookToList(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('lists').exec();
    if (!user) throw new Error('User not found');

    const list = await List.findOne({
      _id: { $in: user.lists },
      listName: req.params.listName,
    });
    if (!list) throw new Error('List not found');

    const bookId = req.body.bookId;
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

    const response = await axios.get(url);
    const bookData = response.data;

    let book = await Book.findOne({ googleBooksId: bookId });

    if (!book) {
      book = new Book({
        googleBooksId: bookId,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        publisher: bookData.volumeInfo.publisher,
        publishedDate: bookData.volumeInfo.publishedDate,
        description: bookData.volumeInfo.description,
        coverImage: bookData.volumeInfo.imageLinks?.thumbnail,
      });
      await book.save();
    }

    if (!list.books.includes(book._id)) {
      list.books.push(book._id);
      await list.save();
    }

    res.json(list);
  } catch (err) {
    console.error('Error adding book to list:', err);
    res.status(400).json({ message: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.avatar = req.body.avatar;
    await user.save();


    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ message: err.message });
  }
}

function createJWT(user) {
  return jwt.sign(
    { user: { _id: user._id, name: user.name, email: user.email } },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
