import { useState } from 'react';

//? Import Components
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

//? Helper function for deriving current player
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((previousTurns) => {
      const currentPlayerSymbol = deriveActivePlayer(previousTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayerSymbol,
        },
        ...previousTurns,
      ];

      return updatedTurns;
    });
  }

  //? This derives the player symbol from gameTurns state for use in Player
  const currentPlayerSymbol = deriveActivePlayer(gameTurns);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={'Player 1'}
            playerSymbol={'X'}
            isActive={currentPlayerSymbol === 'X'}
          />
          <Player
            name={'Player 2'}
            playerSymbol={'O'}
            isActive={currentPlayerSymbol === 'O'}
          />
        </ol>
        <GameBoard turns={gameTurns} onSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
