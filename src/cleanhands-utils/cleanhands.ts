import {PhotoCamera, VideoCamera} from "./services";
import {StreamOptions, Codec} from "./services";

export const photoCamera = new PhotoCamera();

// Options for video
const options:StreamOptions = {
    codec: Codec.H264,
    width: 640,
    height: 480,
}

export const videoCamera = new VideoCamera(options);