const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Require our routes into the application.
require('./server/routes')(app);
app.get('/', function (req, res) {
   res.sendfile('public/views/index.html', { root: __dirname + "/" });
});

module.exports = app;