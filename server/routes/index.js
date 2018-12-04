const todosController = require('../controllers').todos;
const cellphones = require('../controllers').cellphone;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.get('/api/add/cellphones', cellphones.createCSV);
  app.get('/api/get/cellphones', cellphones.fetchAllData);
  

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
};