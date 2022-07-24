// React
import { useState } from 'react'

// 3rd party
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useReactMediaRecorder } from "react-media-recorder";

const App = () => {
    const [clickedDay, setClickedDay] = useState()
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: false });

    return (
        <div>
            <Calendar minDate={new Date()} onClickDay={(e) => setClickedDay(e)} />

            <div>
                <button disabled={!clickedDay || status === 'recording'} onClick={startRecording}>
                    Start Recording
                </button>

                <button disabled={!clickedDay || status === 'stopped'} onClick={stopRecording}>
                    End Recording
                </button>
            </div>

            {mediaBlobUrl && <video src={mediaBlobUrl} controls />}
        </div>
    );
}

export default App;
