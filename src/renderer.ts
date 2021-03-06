import './index.css';
import './App';

import {photoCamera, videoCamera, sensor} from "./cleanhands-utils/cleanhands";
import * as fs from "fs";

const startRecordingBtn = document.getElementById('startRecordingBtn');
const stopRecordingBtn = document.getElementById('stopRecordingBtn');

startRecordingBtn.onclick = takePicture;

sensor.on('data', (data) => {
    let distance = data.toString();
    console.log(`Parent received: ${distance}`);
})


async function takePicture(){

    const image = await photoCamera.takePicture();
    
    fs.writeFileSync("still-image.jpg", image);
}

// Fake timeout to take a picture
setTimeout(() => {
    //startRecordingBtn.click();
    sensor.startSensing();
}, 1000);