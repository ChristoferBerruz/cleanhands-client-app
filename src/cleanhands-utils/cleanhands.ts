import {PhotoCamera, VideoCamera} from "./camera-service";
import {StreamOptions, Codec} from "./camera-service";
import {UltrasonicSensor} from "./sensor-service";
import {StreamCamera} from "pi-camera-connect";

export const photoCamera = new PhotoCamera();

// Options for video
const options:StreamOptions = {
    codec: Codec.MJPEG,
    width: 160,
    height: 160,
    fps: 30,
}

export const videoCamera = new StreamCamera(options);

export const sensor = UltrasonicSensor.getInstance();