const express = require('express')
const router = express.Router()
const packageJson = require('../../package.json')


const updateConfig = {
    repository: packageJson.repository.url ,
    formReleases:false,
    branch:'main',
    tempLocation:'C:/updatedFileSave',
    executeOnComplete:`npm start`,
    exitOnComplete:true
}

module.exports = updater