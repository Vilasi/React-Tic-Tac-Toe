import { useState } from 'react';

//? Import Components
import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function changePlayerHandler() {
    console.log(currentPlayer);
    if (currentPlayer === 'X') {
      setCurrentPlayer('O');
    }
    if (currentPlayer === 'O') {
      setCurrentPlayer('X');
    }
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={'Player 1'}
            playerSymbol={'X'}
            currentPlayer={currentPlayer}
          />
          <Player
            name={'Player 2'}
            playerSymbol={'O'}
            currentPlayer={currentPlayer}
          />
        </ol>
        <GameBoard
          changePlayer={changePlayerHandler}
          currentPlayer={currentPlayer}
        />
      </div>
      Log
    </main>
  );
}

export default App;
