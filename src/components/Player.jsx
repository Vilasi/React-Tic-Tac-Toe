import { useState } from 'react';

//? Import CSS
import './Player.css';

export default function Player({ name, playerSymbol, isActive }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  //? Edit Button Functionality
  function handleEditClick(e) {
    //Here, we're updating the state based on the old state
    //--It is a best practice to always do this within a callback function
    //--React will call this callback function and get the original state value
    //----**This is a good idea because useState is async**
    setIsEditing(() => !isEditing);
  }

  //? Input Enter Key Submit functionality
  function handleSubmit(e) {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            onChange={handleChange}
            onKeyDown={handleSubmit}
            type={'text'}
            // The following is two way binding
            value={playerName}
            required
          />
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={handleEditClick}>{!isEditing ? 'Edit' : 'Save'}</button>
    </li>
  );
}
