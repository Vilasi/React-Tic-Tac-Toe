const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  return (
    <ol id="game-board">
      {initialGameBoard.map((row, index) => {
        return (
          <li key={index}>
            <ol>
              {row.map((cell, cellIndex) => {
                return (
                  <li key={cellIndex}>
                    <button>{cell}</button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
