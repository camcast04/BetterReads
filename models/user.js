// better-reads/models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const bookSchema = new Schema({
  title: String,
  authors: [String],
  coverImage: String,
  bookId: String
});

const listSchema = new Schema({
  name: { type: String, required: true },
  books: [bookSchema]
});

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String },
    lists: {
      type: [listSchema],
      default: [
        { name: 'Favorites', books: [] },
        { name: 'Currently Reading', books: [] },
        { name: 'Did Not Finish', books: [] },
        { name: 'To Read', books: [] }
      ]
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Hash the user's password before saving the document
userSchema.pre('save', async function (next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next(); // Ensure you call next() after hashing the password
});

module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

// const SALT_ROUNDS = 6;

// const userSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: {
//       type: String,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     avatar: { type: String },
//     lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
//     friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: function (doc, ret) {
//         delete ret.password;
//         return ret;
//       },
//     },
//   }
// );

// userSchema.pre('save', async function (next) {
//   // 'this' is the user document
//   if (!this.isModified('password')) return next();
//   // Replace the password with the computed hash
//   this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
//   next(); // Ensure you call next() after hashing the password
// });

// module.exports = mongoose.model('User', userSchema);
