import { useState, useRef } from "react";

export default function Player() {
  const inputRef = useRef();
  const [player, setPlayer] = useState('');

  function handleSetName(event){
    setPlayer(inputRef.current.value);

    // borderline not best practice because we are changing the dom directly, but he said it was fine in this case
    inputRef.current.value = '';
  }


  return (
    <section id="player">
      <h2>Welcome {player.trim() == '' ? 'unknown entity' : player}</h2>
      <p>
        <input ref={inputRef} type="text" />
        <button onClick={handleSetName}>Set Name</button>
      </p>
    </section>
  );
}
