import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    function handleEdit(event){

        setIsEditing((isEditing) => !isEditing);
        
        // this is a little confusing
        // isEditing is still true when the Save button is clicked to set isEditing to false (setIsEditing is still being scheduled to run and has not yet been executed)
        if (isEditing){
            onChangeName(symbol, playerName);
            console.log('NAME IS CHANGED')
        }

    }

    return (
        <li className={isActive? 'active' : undefined}>
            <span className="player">
                {isEditing? 
                    <input type="text" required value={playerName} onChange={handleChange}></input> : 
                    <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            {/* <button onClick={()=> setIsEditing((isEditing) => !isEditing)}>{isEditing? 'Save' : 'Edit'}</button> */}
            <button onClick={handleEdit}>{isEditing? 'Save' : 'Edit'}</button>
        </li>
    );
}
