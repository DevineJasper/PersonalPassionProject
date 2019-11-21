module.exports = app => {
  const controller = require('../controllers/authors.controller.js');
  const {checkToken, hasRole} = require('../middleware/');
  const {ADMIN} = require('../roles');
  app.post('/authors', checkToken, hasRole(ADMIN), controller.create);
  app.get('/authors', checkToken, controller.findAll);
  app.get('/authors/:authord', checkToken, controller.findOne);
  app.put('/authors/:authorId', checkToken, hasRole(ADMIN), controller.update);
};
