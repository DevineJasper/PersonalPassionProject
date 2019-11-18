module.exports = app => {
  const {checkToken} = require('../middleware/');
  const controller = require('../controllers/books.controller.js');
  app.post('/books', checkToken, controller.create);
  app.get('/books', checkToken, controller.findAll);
  app.get('/books/:bookId', checkToken, controller.findOne);
  app.put('/books/:bookId', checkToken, controller.update);
  app.delete('/books/:bookId', checkToken, controller.delete);
};
