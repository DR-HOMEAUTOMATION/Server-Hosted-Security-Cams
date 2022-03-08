const routes = {
  "/":"returns all possible routes this server supports",
  "/image":"returns a jpeg image taken at time of request",
  "/update":"updates and restarts the program(pull most recent commit from git origin main)"
}


const express = require('express');

require('dotenv').config();

const middlewares = require('./middlewares');
const image = require('./api/image');
const update = require('./api/update')

const app = express();


// return a dictionary of all of the possible routes
app.get('/', (req, res) => {
  res.json(routes)
});

app.use('/image',image)
app.use('/update',update)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
