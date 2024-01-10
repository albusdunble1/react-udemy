import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, className = '', onClose}) {
    const dialogRef = useRef();

    useEffect(() => {
        // good practice to assign the ref to a variable because in some case the ref might change in afterwards
        const modal = dialogRef.current;
        if (open) {
            modal.showModal();
        } 
        // this also works, but im using the clean up function remind myself that it also executes everytime the dependency changes or right before the component is destroyed
        // else {
        //     modal.close();
        // }

        return () => modal.close();
    }, [open]);

    return createPortal(
        <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>
        , document.getElementById('modal')
    );
}