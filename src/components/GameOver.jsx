export default function GameOver({ winner, rematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner}</p>
      <button onClick={() => rematch()}>Rematch!</button>
    </div>
  );
}
