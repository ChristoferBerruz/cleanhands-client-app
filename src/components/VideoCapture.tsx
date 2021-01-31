import React from 'react';

const RecordButton:React.FC = () => {

    return(
        <div>
            <button id="recordBtn">
                Start Recording
            </button>
            <button id="stopBtn">
                Stop Recording
            </button>
        </div>
    )
}

export default RecordButton;