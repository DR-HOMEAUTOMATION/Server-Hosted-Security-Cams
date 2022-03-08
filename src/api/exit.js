const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
    res.json('exited program')
    process.exit(0); 
})

module.exports = router