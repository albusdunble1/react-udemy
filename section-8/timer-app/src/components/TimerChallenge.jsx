import { useRef, useState } from "react"
import ResultModal from "./ResultModal";

// let timer;

export default function TimerChallenge({title, targetTime}){
    // ref values will not be lost when the component function gets reexecuted just like state
    // but when ref value is changed, it will not reexecute the component function
    // if let timer; is used, timer variable will always be reset whenever a the component function is reevaluated(when a state changes), thus it is not viable
    const timerRef = useRef();
    const dialogRef = useRef();

    // const [timerExpired, setTimerExpired] = useState(false);
    // const [timerStarted, setTimerStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timerRef.current);
        // setTimeRemaining(targetTime * 1000);
        dialogRef.current.open();
    }

    // function handleStartTimer(event){
    //     timerRef.current = setTimeout(() => {
    //         setTimerExpired(true);
    //         // dialogRef.current.showModal();
    //         dialogRef.current.open();
    //     }, targetTime * 1000);

    //     setTimerStarted(true);
    // }

    function handleStartTimer(event){
        timerRef.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    // function handleStopTimer(event){
    //     clearTimeout(timerRef.current);
    // }

    function handleStopTimer(event){
        clearInterval(timerRef.current);
        // setTimeRemaining(targetTime * 1000);
        dialogRef.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    return (
        <>
            {/* no need to hide it with timeExpired anymore since modal is not open by default */}
            {/* ref is not longer a prop but a second argument passed into forwardRef, so it has to be 'ref' */}
            <ResultModal ref={dialogRef} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
            {/* {timerExpired && <ResultModal targetTime={targetTime} result="lost" />} */}
            <section className="challenge">
                <h2>{title}</h2>
                {/* {timerExpired && <p>YOU LOST LOL!!</p>} */}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive? handleStopTimer: handleStartTimer}>
                        {timerIsActive? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active': undefined}>
                    {timerIsActive ? 'Timer is running...' : 'Timer Inactive'}
                </p>
            </section>
        </>
        
    )
}