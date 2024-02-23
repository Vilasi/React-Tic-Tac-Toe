import { useState } from 'react';

//? Import Components
import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  // This state is lifted for the child components Player & GameBoard
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handleSelectSquare() {
    setCurrentPlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));
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
          updateActivePlayer={handleSelectSquare}
          currentPlayerSymbol={currentPlayer}
        />
      </div>
      Log
    </main>
  );
}

export default App;
