import './index.css';
import './App';

import {StillCamera} from 'pi-camera-connect';
import {StreamCamera, Codec} from 'pi-camera-connect';
import * as fs from "fs";
const JMuxer = require('jmuxer');
const startRecordBtn = document.getElementById('recordBtn');
const stopRecordBtn = document.getElementById('stopBtn');

startRecordBtn.onclick = startRecording;


const jmux = new JMuxer({
    node:'liveFeedVideo',
    mode:'video',
    flushingTime: 0
});

const liveFeedBtn = document.getElementById('liveFeedBtn');
const liveFeedVideo:any = document.getElementById('liveFeedVideo');
liveFeedBtn.onclick = liveFeed;

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

async function liveFeed(){
    const videoCamera = new StreamCamera({
        codec: Codec.H264,
        width: 640,
        height: 480,
        fps: 30
    });

    const stream = videoCamera.createStream();

    stream.once('data', () => {
        liveFeedVideo.play();
    })

    stream.on('data', (data) => {
        try{
            jmux.feed({
                video: new Uint8Array(data)
            });
        }catch (error){
            console.log("ERROR AF" + {...error})
        }
    });

    videoCamera.startCapture().then(() => {

        setTimeout(() => videoCamera.stopCapture(), 5000);
    });
}