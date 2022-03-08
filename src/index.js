
const express = require('express');
const packageJson = require('../package.json')
require('dotenv').config();


const routes = {
  "/":"returns all possible routes this server supports",
  "/image":"returns a jpeg image taken at time of request",
  "/update":"updates and restarts the program(pull most recent commit from git origin main)"
}

const updateConfig = {
  repository: packageJson.repository.url ,
  formReleases:false,
  branch:'main',
  tempLocation:'C:/updatedFileSave',
  executeOnComplete:`npm start`,
  exitOnComplete:true
}


const middlewares = require('./middlewares');
const image = require('./api/image');
const update = require('./api/update')
const exit = require('./api/exit');
const req = require('express/lib/request');
const app = express();


// return a dictionary of all of the possible routes
app.get('/', (req, res) => {
  res.json(routes)
});

app.use('/image',image)
app.use('/exit',exit)
app.get('/update',(req,res)=>{
  res.json('updating'); 
  server.close(async()=>{
    const AutoGitUpdater = (await import('auto-git-update')).default
    const updater = new AutoGitUpdater(updateConfig)
    updater.forceUpdate() 
  })
})
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

const serverShutDown = (cb) =>{
  server.close(cb)
}
