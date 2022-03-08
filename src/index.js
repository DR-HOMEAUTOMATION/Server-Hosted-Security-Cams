const express = require('express');

require('dotenv').config();
const packageJson = require('../package.json')

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
  executeOnComplete:`${process.cwd()}/start.bat`,
  exitOnComplete:true
}


const middlewares = require('./middlewares');
const image = require('./api/image');

const app = express();


// return a dictionary of all of the possible routes
app.get('/', (req, res) => {
  res.json(routes)
});

app.use('/image',image)
app.get('/update',(req,res)=>{
  res.json('updating server')
  closeServer(async()=>{
    const AutoGitUpdate = (await import('auto-git-update')).default;
    const updater = new AutoGitUpdate(updateConfig); 
    updater.forceUpdate();
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


const closeServer = (cb) =>{
  server.close(cb)
}
