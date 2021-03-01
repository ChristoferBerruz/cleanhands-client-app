import React from 'react';
import './VideoCapture.scss';

const PiCameraButtons:React.FC = () => {

    return(
        <div>
            <button id="startRecordingBtn">
            </button>
            <button id="stopRecordingBtn">
            </button>
        </div>
    )
}

export default PiCameraButtons;