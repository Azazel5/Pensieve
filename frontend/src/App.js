// React
import { useCallback, useState } from 'react'

// 3rd party
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useReactMediaRecorder } from "react-media-recorder";

const App = () => {
    // Hooks
    const [clickedDay, setClickedDay] = useState()
    const [extracting, setIsExtracting] = useState(false)
    const [blob, setBlob] = useState()
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({
            video: false,
            onStop: (blobUrl, blob) => {
                setBlob(blob)
            }
        })

    // Normal Variables
    const stoppedStatuses = ['idle', 'stopped']

    // Event Handlers
    const enableRecordingHandler = (e) => {
        // Only enable the startRecording/endRecording buttons to be enabled if the
        // selected date is today's date i.e. you cannot alter the past

        const todaysDate = new Date()

        if (todaysDate.toDateString() === e.toDateString()) {
            setClickedDay(todaysDate)
        }

        else {
            setClickedDay()
        }
    }

    const sendToServerHandler = useCallback(async () => {
        if (extracting || !blob) return

        setIsExtracting(true)

        const audiofile = new File([blob], "audiofile.mp4", { type: "audio/mp4" })
        const formData = new FormData()
        formData.append("file", audiofile)

        if (mediaBlobUrl) {
            const response = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/extract`, {
                method: 'POST',
                body: formData
            })

            const responseJSON = await response.json()

            if (response.status === 200) {
                alert(responseJSON.message)
            }

            setIsExtracting(false)
            setBlob()
        }
    }, [extracting, mediaBlobUrl, blob])

    return (
        <div className='app'>
            <Calendar
                className="calendar"
                onClickDay={enableRecordingHandler} />

            <div className='app__container'>
                <div>
                    <button disabled={!clickedDay || status === 'recording'} onClick={startRecording}>
                        Start Recording
                    </button>

                    <button disabled={!clickedDay || stoppedStatuses.includes(status)} onClick={stopRecording}>
                        End Recording
                    </button>
                </div>

                {blob && <button onClick={sendToServerHandler}>Send to server</button>}
            </div>
        </div>
    );
}

export default App;
