const Book = require('../models/book.model.js');

exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(500).send({err: 'title can not be empty'});
  }

  const book = new Book({
    title: req.body.title,
    authorId: req.body.authorId,
    userId: req.authUserId
  });

  book
    .save()
    .then(book => res.send(book))
    .catch(err => {
      res.status(500).send({error: err.book || 'Error'});
    });
};

exports.findAll = async (req, res) => {
  try {
    const books = await Book.find({userId: req.authUserId});
    res.send(books);
  } catch (err) {
    res.status(500).send({err: err.book || 'Error'});
  }
};

exports.findOne = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.bookId,
      userId: req.authUserId
    });
    if (book) {
      res.send(book);
    } else {
      res.status(404).send('No book found');
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send('title mag niet leeg zijn');
  }

  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.bookId,
        userId: req.authUserId
      },
      {
        title: req.body.title,
        authorId: req.body.authorId
      },
      {
        new: true
      }
    );

    if (!book) {
      return res.status(404).send('No book found');
    }
    res.send(book);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const book = await Book.findOneAndRemove({
      _id: req.params.bookId,
      userId: req.authUserId
    });
    if (!book) {
      return res.status(404).send('No book found');
    }
    res.send(book);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};
