//betterreads/models/book.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleBooksId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: [String],
  publisher: String,
  publishedDate: String,
  description: String,
  coverImage: String,
});

module.exports = mongoose.model('Book', bookSchema);
