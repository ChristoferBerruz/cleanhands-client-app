import './index.css';
import './App';

import {StillCamera} from 'pi-camera-connect';
import {StreamCamera, Codec} from 'pi-camera-connect';
import * as fs from "fs";

const startRecordBtn = document.getElementById('recordBtn');
const stopRecordBtn = document.getElementById('stopBtn');

startRecordBtn.onclick = startRecording;



async function takePicture() {
    const stillCamera = new StillCamera();

    const image = await stillCamera.takeImage();

    fs.writeFileSync("still-image.jpg", image);
}


async function startRecording(){

    const videoCamera = new StreamCamera({
        codec: Codec.H264,
        width: 640,
        height: 480,
    });

    const writeStream = fs.createWriteStream("video-stream.h264");

    const videoStream = videoCamera.createStream()

    videoStream.pipe(writeStream);

    videoCamera.startCapture().then(() => {

        setTimeout(() => videoCamera.stopCapture(), 5000);
    });
}