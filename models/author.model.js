const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema(
  {
    name: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Author', AuthorSchema);
