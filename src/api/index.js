/*
  --> Dawson Reschke <-- 
Using raspi camera create an imager serving server for the security system. 
*/
const express = require('express');
const PiCamera = require('pi-camera');
const TEMPIMAGE = '/home/pi/workspace/home_automation/Server-Hosted-Security-Cams/public/NW.jpeg'

const securityCam = new PiCamera({
	mode:'photo',
	width:'640',
	height:'480',
	noperview:true
});

const router = express.Router();

// take an image and serve it 
router.get('/image', async(req, res,next) => {
	try{
		securityCam.snap()
			.then(result=>{
				res.sendFile(result);
			})
			.catch(err=>{ // current Error: `/bin/sh: 1: raspistill: not found` : hopefully this error is fixed  by adding the picamera and enabling it... 
				console.log(`error caugt during snap:  ${err}`)
				next(err)
			})
	}catch(err){
		console.log(`error caught after attempted snap: ${err}`)
		next(err)
	}
	res.sendFile(TEMPIMAGE)
});
// TODO steam video feed from camera using web sockets
module.exports = router


