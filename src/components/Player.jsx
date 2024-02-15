import { useState } from 'react';

//? Import CSS
import './Player.css';

export default function Player({ name, playerSymbol }) {
  const [playerName, setPlayerName] = useState(name);
  const [inputDisplay, setInputDisplay] = useState('hidden');

  function handleClick() {
    setInputDisplay('text');
  }

  function handleSubmit(e) {
    if (e.key === 'Enter') {
      console.log(e.value);
      setInputDisplay('hidden');
    }
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  //? Derive display
  //   let inputDisplay = 'hidden';
  //   if (playerName !== name) {
  //     inputDisplay = 'text';
  //   }
  return (
    <li>
      <span className="player">
        <span className="player-name">{playerName}</span>
        <span className="player-symbol">{playerSymbol}</span>
        <input
          onChange={handleChange}
          onKeyDown={handleSubmit}
          type={inputDisplay}
        />
      </span>
      <button onClick={handleClick}>Edit</button>
    </li>
  );
}
