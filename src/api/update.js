const {exec} = require('child_process')

const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    exec("npm run update")
})