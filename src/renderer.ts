import './index.css';
import './App';

import {videoCamera, sensor} from "./cleanhands-utils/cleanhands";
import {io, Socket} from "socket.io-client";
import axios from "axios";

// Websocket information
const serverName = 'https://cleanhands-flask-server-p644b.ondigitalocean.app';
const framesNamespace = 'pi-frames';

const handwashingTimeReport = document.getElementById('handwashingTimeReport');

// Define videoSocket to be used during application lifetime
const videoSocket:Socket = io(`${serverName}/${framesNamespace}`);

// Define url endpoint to insert handwashing record
const endpointURL = `${serverName}/api/v1/hanwashing-record`;

// Get device ID from environment
const deviceID = parseInt(process.env.CH_DEVICE_ID);

function WriteToScreen(message:string)
{
    handwashingTimeReport.innerHTML = message;
    // Set a timeout of 30 seconds to clear screen message
    setTimeout(() => {
        handwashingTimeReport.innerHTML = "";
    },30000);
}

videoCamera.on('frame', (frame) => {
    if(videoSocket.connected)
    {
        videoSocket.emit('frameall', frame);
    }
});

videoSocket.on('result', (result:number) => {
    console.log(`Received the following result: ${result}`);
    let resultMessage = " Your handwashing time is: " + result.toString() + " seconds";
    WriteToScreen(resultMessage);
    axios.put(endpointURL, {device:deviceID, duration:result});
});

sensor.on('near', (distance:number) => {
    console.log(`Starting capture.`);
    videoCamera.startCapture().catch(() => console.log('Camera is already in used'));
});


sensor.on('leave', (distance:number) => {
    videoCamera.stopCapture().catch(() => console.log(`Camera is already closed.`));
    console.log(`Stopping capture.`);
    if(videoSocket.connected)
    {
        videoSocket.emit('processall');
    }
});

// Start sensor
sensor.startSensing();