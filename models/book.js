const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    description: { type: String },
    datePublished: { type: Date },
    bookCover: { type: String },
    reviewsAndRatings: [reviewAndRatingSchema],
  },
  { timestamps: true }
);

const reviewAndRatingSchema = new Schema(
  {
    review: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
module.exports = mongoose.model('ReviewAndRating', reviewAndRatingSchema);
