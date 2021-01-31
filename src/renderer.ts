import './index.css';
import './App';

import {StillCamera} from 'pi-camera-connect';
import * as fs from "fs";
const cameraButton = document.getElementById('cameraBtn');
cameraButton.onclick = takePicture;

async function takePicture() {
    const stillCamera = new StillCamera();

    const image = await stillCamera.takeImage();

    fs.writeFileSync("still-image.jpg", image);
}
