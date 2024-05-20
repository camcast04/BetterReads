const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    is_default: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('List', listSchema);
