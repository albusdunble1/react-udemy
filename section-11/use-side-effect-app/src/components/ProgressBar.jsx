import { useEffect, useState } from "react";


// moved to its own component so that only the progress bar gets reexecuted and rerendered every inteval where setRemainingTime is called to change the state
export default function ProgressBar({timer}) {
    // console.log('PROGRESS BAR')
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
      const interval = setInterval(() => {
        console.log('INTERVAL SET')
        setRemainingTime(prevTime => prevTime-10);
      }, 10);
  
      // cleanup function below will be executed when the timer in DeleteConfirmation timeouts, and onConfirm is called
      // which then closes the modal and destroy the DeleteConfirmation component along with this progress bar component
      return () => {
        console.log('INTERVAL CLEARED')
        clearInterval(interval);
      };
  
    }, []);

    return (
      <progress value={remainingTime} max={timer} />
    )
}