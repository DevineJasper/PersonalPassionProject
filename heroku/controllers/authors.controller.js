const Author = require('../models/author.model.js');

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(500).send({err: 'name can not be empty'});
  }

  const author = new Author({
    name: req.body.name
  });

  author
    .save()
    .then(author => res.send(author))
    .catch(err => {
      res.status(500).send({error: err.author || 'Error'});
    });
};

exports.findAll = async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    res.status(500).send({err: err.author || 'Error'});
  }
};

exports.findOne = async (req, res) => {
  try {
    const author = await Author.findById(req.params.authorId);
    if (author) {
      res.send(author);
    } else {
      res.status(404).send('No author found');
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('name mag niet leeg zijn');
  }

  try {
    const author = await Author.findByIdAndUpdate(
      req.params.authorId,
      {
        name: req.body.name
      },
      {
        new: true
      }
    );

    if (!author) {
      return res.status(404).send('No author found');
    }
    res.send(author);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};
