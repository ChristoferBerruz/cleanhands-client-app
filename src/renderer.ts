import './index.css';
import './App';

import {videoCamera, sensor} from "./cleanhands-utils/cleanhands";
import {io, Socket} from "socket.io-client";

// Websocket information
const serverName = 'https://cleanhands-flask-server-p644b.ondigitalocean.app';
const framesNamespace = 'pi-frames';

const handwashingTimeReport = document.getElementById('handwashingTimeReport');


function WriteToScreen(message:string)
{
    handwashingTimeReport.innerHTML = message;
    // Set a timeout of 3 seconds to clear screen message
    setTimeout(() => {
        handwashingTimeReport.innerHTML = "";
    },3000);
}
function HandleConnectVideoSocket(videoSocket:Socket)
{
    // Attach callback on videostream
    videoCamera.on('frame', (data) => {
        videoSocket.emit('frame', data);
    });

    let cleanUpResources = () => {
        videoCamera.stopCapture();
        videoSocket.emit('reset');
        videoSocket.disconnect();
    }

    // We clear up the socket connection after we get a result
    videoSocket.on('result', (data:number) => {
        console.log(`Received the following result: ${data}`);
        cleanUpResources();
        let resultMessage = " Your handwashing time is: " + data.toString() + " seconds";
        WriteToScreen(resultMessage);
    });

    // Record indefinitely until we get result from server
    videoCamera.startCapture();

    sensor.on('leave', () => {
        if(videoSocket.connected)
        {
            cleanUpResources();
            let resultMessage = "";
            WriteToScreen(resultMessage);
        }
    });
}


function HandleCloseness()
{
    // Create a connection to the video socket
    const videoSocket:Socket = io(`${serverName}/${framesNamespace}`);
    console.log(`${serverName}/${framesNamespace}`);

    videoSocket.on("connect", () => {
        console.log(`Sucessfully connected to ${framesNamespace} socket`);
        HandleConnectVideoSocket(videoSocket);
    });

    videoSocket.on("connect_error", (e:any) => console.log(`Something went wrong: ${e}`));
}

const sensorNearHandler = (distance:number) => {
    console.log(`Someone is near at ${distance} cm.`);
    HandleCloseness();
}

sensor.on('near', sensorNearHandler);

sensor.startSensing();
//setTimeout(HandleCloseness, 15000);