import './index.css';
import './App';

import {photoCamera, videoCamera, sensor} from "./cleanhands-utils/cleanhands";
const JMuxer = require('jmuxer');
import * as fs from "fs";
import {io} from "socket.io-client";

// Websocket information
const serverName = 'https://02daddbf936f.ngrok.io';
const framesNamespace = 'pi-frames';


function HandleConnectVideoSocket(videoSocket:any)
{
    // Create stream of video
    const videoStream = videoCamera.createStream();


    // Attach callback on videostream
    videoStream.on('data', (data) => {
        videoSocket.emit('frame', new Uint8Array(data));
    });

    // Record for 10 second and disconnect from socket
    videoCamera.startCapture().then(() => {
        setTimeout(() => {
            videoCamera.stopCapture();
            videoSocket.disconnect();
        }, 1000);
    });
}


function HandleCloseness()
{
    // Create a connection to the video socket
    const videoSocket = io(`${serverName}/${framesNamespace}`);
    console.log(`${serverName}/${framesNamespace}`);

    videoSocket.on("connect", () => {
        console.log(`Sucessfully connected to ${framesNamespace} socket`);
        HandleConnectVideoSocket(videoSocket);
    });

    videoSocket.on("connect_error", (e:any) => console.log(`Something went wrong: ${e}`));
}

async function takePicture(){

    const image = await photoCamera.takePicture();
    
    fs.writeFileSync("still-image.jpg", image);
}

// Fake timeout to test sockets
setTimeout(() => {
    HandleCloseness();
}, 15000);