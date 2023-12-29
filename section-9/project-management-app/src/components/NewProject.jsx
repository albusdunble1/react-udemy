import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({onAddProject, onCancel}) {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const errorModal = useRef();

    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        // validation
        if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
            errorModal.current.open();
            return;
        }

        onAddProject({title: enteredTitle, description: enteredDescription, dueDate: enteredDueDate});

    }

    function handleModalClose(){
        console.log('MODAL CLOSED')
    }

    return (
        <>
            <Modal buttonText="Okay" ref={errorModal} onClose={handleModalClose}>
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
            </Modal>

            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>Save</button>
                    </li>
                    <li>
                        <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
                    </li>
                </menu>
                <div>
                    {/* <p>
                        <label htmlFor="">Title</label>
                        <input type="text" />
                    </p>
                    <p>
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" cols="30" rows="10" />
                    </p>
                    <p>
                        <label htmlFor="">Due Date</label>
                        <input type="text" />
                    </p> */}
                    <Input type="text" ref={title} label="Title"/>
                    <Input ref={description} label="Description" textarea/>
                    <Input type="date" ref={dueDate} label="Due Date"/>
                </div>
            </div>
        </>

    )
}