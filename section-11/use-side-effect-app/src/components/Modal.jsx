import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();


  // needs to be in useEffect because the "dialog" ref is not defined until the jsx component function is executed (ref={dialog} in the jsx)
  // so we use useEffect to run the check after the component function has been executed, where the dialog ref is defined
  // then we include open prop as a dependency so that useEffect will reexecute if the value of open changes
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open])

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open && children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;



// import { forwardRef, useImperativeHandle, useRef } from 'react';
// import { createPortal } from 'react-dom';

// const Modal = forwardRef(function Modal({ children }, ref) {
//   const dialog = useRef();

//   useImperativeHandle(ref, () => {
//     return {
//       open: () => {
//         dialog.current.showModal();
//       },
//       close: () => {
//         dialog.current.close();
//       },
//     };
//   });

//   return createPortal(
//     <dialog className="modal" ref={dialog}>
//       {children}
//     </dialog>,
//     document.getElementById('modal')
//   );
// });

// export default Modal;

