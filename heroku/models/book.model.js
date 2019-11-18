const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const BookSchema = mongoose.Schema(
  {
    title: String,
    authorId: ObjectId,
    userId: ObjectId
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', BookSchema);
