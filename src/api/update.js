const express = require('express')
const router = express.Router()
const packageJson = require('../../package.json')


const config = {
    repository: packageJson.repository.url ,
    formReleases:false,
    branch:'main',
    tempLocation:'C:/updatedFileSave',
    executeOnComplete:`${process.cwd()}/index.js`,
    exitOnComplete:true
}

// const updater = new AutoGitUpdate(config)

router.get('/',async (req,res)=>{
    const AutoGitUpdate = (await import('auto-git-update')).default;
    const updater = new AutoGitUpdate(config); 
    updater.autoUpdate();
})

module.exports = router