// better-reads/models/list.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  listName: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  is_default: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const listSchema = new Schema(
//   {
//     listName: {
//       type: String,
//       required: true,
//     },
//     books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
//     user: { type: Schema.Types.ObjectId, ref: 'User' },
//     is_default: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('List', listSchema);

