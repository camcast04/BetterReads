// better-reads/models/book.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewAndRatingSchema = new Schema(
  {
    review: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const bookSchema = new Schema(
  {
    googleBooksId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    description: { type: String },
    datePublished: { type: Date },
    bookCover: { type: String },
    reviewsAndRatings: [
      {
        review: { type: String },
        rating: { type: Number, min: 0, max: 5 },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);

async function createBook(req, res) {
  try {
    const { title, authors, description, datePublished, bookCover } = req.body;
    const book = new Book({
      title,
      authors,
      description,
      datePublished,
      bookCover,
    });
    
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(400).json({ message: err.message });
  }
}
module.exports = { createBook };
module.exports = mongoose.model('Book', bookSchema);
module.exports = mongoose.model('ReviewAndRating', reviewAndRatingSchema);


// const bookSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     authors: [{ type: String, required: true }],
//     description: { type: String },
//     datePublished: { type: Date },
//     bookCover: { type: String },
//     reviewsAndRatings: [reviewAndRatingSchema],
//   },
//   { timestamps: true }
// );