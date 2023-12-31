import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    console.log('TIMER SET')
    const timer = setTimeout(() => {
      onConfirm()
    }, TIMER);

    // clean up function that is executed before the useEffect function runs again as well as right before this component dismounts or removed from the DOM
    // kinda like ngOnDestroy i think
    // when passing functions to useEffect dependencies, ALWAYS use useCallback for the function in the dependency
    return () => {
      console.log('TIMER CLEARED')
      clearTimeout(timer);
    }
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>

      {/* <progress value={remainingTime} max={TIMER} /> */}
      <ProgressBar timer={TIMER}/>
    </div>
  );
}
