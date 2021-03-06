import {PhotoCamera, VideoCamera} from "./camera-service";
import {StreamOptions, Codec} from "./camera-service";
import {UltrasonicSensor} from "./sensor-service";

export const photoCamera = new PhotoCamera();

// Options for video
const options:StreamOptions = {
    codec: Codec.H264,
    width: 640,
    height: 480,
}

export const videoCamera = new VideoCamera(options);

export const sensor = UltrasonicSensor.getInstance();