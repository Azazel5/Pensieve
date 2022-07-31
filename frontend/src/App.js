// React
import { useCallback, useState, useRef, useEffect } from 'react'

// 3rd party
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useReactMediaRecorder } from "react-media-recorder";

const App = () => {
    // Hooks
    const [clickedDay, setClickedDay] = useState()
    const [extracting, setIsExtracting] = useState(false)
    const isMounted = useRef(true)
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: false });

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

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
        if (extracting) return

        setIsExtracting(true)

        const blobAPICall = await fetch(mediaBlobUrl)
        const blob = await blobAPICall.blob()
        const audiofile = new File([blob], "audiofile.mp4", { type: "audio/mp4" })
        const formData = new FormData()
        formData.append("file", audiofile)

        if (mediaBlobUrl) {
            const response = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/extract`, {
                method: 'POST',
                body: formData
            })

            const responseJSON = await response.json()

            if (responseJSON.status === 200) {
                alert('Penseive successfully extracted')
            }

            if (isMounted.current) {
                setIsExtracting(false)
            }
        }
    }, [extracting, mediaBlobUrl])

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

                {mediaBlobUrl && <button onClick={sendToServerHandler}>Send to server</button>}
            </div>
        </div>
    );
}

export default App;
