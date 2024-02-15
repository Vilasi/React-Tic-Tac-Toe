import { useState } from 'react';

//? Import CSS
import './Player.css';

export default function Player({ name, playerSymbol }) {
  const [playerName, setPlayerName] = useState(name);
  const [inputDisplay, setInputDisplay] = useState('hidden');
  const [isEditing, setIsEditing] = useState(false);

  function handleClick(e) {
    console.log(e.target.textContent);
    setInputDisplay('text');
    setIsEditing(true);

    if (e.target.textContent === 'Save') {
      setInputDisplay('hidden');
      setIsEditing(false);
    }
  }

  function handleSubmit(e) {
    if (e.key === 'Enter') {
      //   console.log(e.value);
      setInputDisplay('hidden');
      setIsEditing(false);
    }
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  //   let playerNameDisplay = <span className="player-name">{playerName}</span>;

  return (
    <li>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            onChange={handleChange}
            onKeyDown={handleSubmit}
            type={inputDisplay}
          />
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={handleClick}>{!isEditing ? 'Edit' : 'Save'}</button>
    </li>
  );
}
