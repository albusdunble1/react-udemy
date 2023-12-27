import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";


const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){
    const dialogRef = useRef();

    const userLost = remainingTime <= 0;

    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    // redirect the ref from the parent to the object returned by this function
    // instead of directly connecting the ref from the parent to the dialog in the child component
    // because this assumes that the parent knows what kind of element it is trying to reference
    // this would break if another developer changes dialog to div, making showModal called in the parent component break
    // so another developer should change the imperative handle accordingly to make sure that the parent component calling the open function will not break
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialogRef.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
        {/* <dialog ref={ref} className="result-modal"> */}
        {/* hardcoding the modal to open will not show a backdrop */}
        {/* <dialog className="result-modal" open> */}
            
            {userLost && <h2> You LOST LOL!</h2>}
            {!userLost && <h2> Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left!</strong></p>

            {/* built in HTML
            submit button inside a form with method dialog will close the dialog */}
            {/* <form method="dialog" onSubmit={onReset}> */}
            {/* when dialog is closed using ESC key, onReset will not be called since it's tied to the button */}
            {/* so bind the onReset to onClose in the dialog instead, so we dont need to bind it to onSubmit */}
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>, 
        document.getElementById("modal")
    )
})

export default ResultModal;