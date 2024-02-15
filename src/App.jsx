//? Import Components
import Player from './components/Player';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name={'Player 1'} playerSymbol={'X'} />
          <Player name={'Player 2'} playerSymbol={'O'} />
        </ol>
      </div>
      Log
    </main>
  );
}

export default App;
