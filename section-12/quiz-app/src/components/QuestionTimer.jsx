import { useEffect, useState } from "react";

export default function QuestionTimer({timeout, onTimeout, mode}) {
    const [remaningTime, setRemaingTime] = useState(timeout);


    useEffect(() => {
        console.log('TIMEOUT SET')
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            console.log('TIMEOUT CLEARED')
            clearTimeout(timer);
        }
    }, [timeout, onTimeout])

    // to make sure that the interval is recreated, the timer "key" is used in the Question parent component to destroy and recreate the QuestionTimer component(this component)
    useEffect(() => {
        console.log('INTERVAL SET')
        const interval = setInterval(() => {
            setRemaingTime(prevRemainingTime => prevRemainingTime - 10)
        }, 10)

        return () => {
            console.log('INTERVAL CLEARED')
            clearInterval(interval)
        }
    }, [])


    return (
        <progress id="question-time" max={timeout} value={remaningTime} className={mode}/>
    )
}