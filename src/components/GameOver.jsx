export default function GameOver({ winner, onRestart, playerNames }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner !== 'Draw' ? `${playerNames[winner]} has won!` : winner}</p>
      <button onClick={() => onRestart()}>Rematch!</button>
    </div>
  );
}
