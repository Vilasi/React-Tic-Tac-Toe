//? Import Components
import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name={'Player 1'} playerSymbol={'X'} />
          <Player name={'Player 2'} playerSymbol={'O'} />
        </ol>
        <GameBoard />
      </div>
      Log
    </main>
  );
}

export default App;
