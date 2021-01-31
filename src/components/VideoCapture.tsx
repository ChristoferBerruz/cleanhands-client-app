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
            <video controls muted id="liveFeedVideo"/>
            <button id="liveFeedBtn" > Live Feed </button>
        </div>
    )
}

export default RecordButton;