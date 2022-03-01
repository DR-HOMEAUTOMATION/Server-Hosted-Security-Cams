/*
  --> Dawson Reschke <-- 
Using raspi camera create an imager serving server for the security system. 
*/
const express = require('express');
const JpegCam = require('../../../libcamera-js')
const path = require('path');
const CommandArgs = {
	'--width':480,
	'--height':480,
	'-o':'public/testOne.jpg',
	'-t':500,
	'-n':''
}

const myCam = new JpegCam(CommandArgs);

const router = express.Router();

router.get('/image',async (req,res,next)=>{
	try{
		myCam.getNewImage(code=>{
			if(code == 0){
				res.sendFile('./public/testOne.jpg',{root:process.cwd()});
			}
			console.log(code); 
		})
	}catch(err){
		next(err)
	}
})


// TODO steam video feed from camera using web sockets
module.exports = router


