import './index.css';
import './App';

import {photoCamera, videoCamera, sensor} from "./cleanhands-utils/cleanhands";
import {io} from "socket.io-client";

// Websocket information
const serverName = 'https://02daddbf936f.ngrok.io';
const framesNamespace = 'pi-frames';


function HandleConnectVideoSocket(videoSocket:any)
{
    // Attach callback on videostream
    videoCamera.on('frame', (data) => {
        videoSocket.emit('frame', data);
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

// Fake timeout to test sockets
setTimeout(() => {
    HandleCloseness();
}, 15000);