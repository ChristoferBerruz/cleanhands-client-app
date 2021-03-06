import {
    StillCamera, 
    StreamCamera,
    StreamOptions
} from "pi-camera-connect";

import {Readable} from "stream";

export {StreamOptions, Codec} from "pi-camera-connect";

export class PhotoCamera{

    private camera: StillCamera | null = null;

    constructor(){
        this.camera = new StillCamera();
    }

    public takePicture():Promise<Buffer>{

        return this.camera.takeImage();
    }
}

export class VideoCamera{

    private videoCamera: StreamCamera | null = null;

    constructor(options?:StreamOptions){

        this.videoCamera = new StreamCamera(options);
    }

    public createStream():Readable
    {
        return this.videoCamera.createStream();
    }

    public startRecording():Promise<void>{
        return this.videoCamera.startCapture();
    }

    public stopRecording():Promise<void>{
        return this.videoCamera.stopCapture();
    }
}