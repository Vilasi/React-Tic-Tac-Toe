export default function GameBoard({ onSelectSquare, gameBoard }) {
  // console.log(gameBoard);

  // function handleCellClick(rowIndex, colIndex) {
  // updateGameBoard(rowIndex, colIndex);
  // updateActivePlayer();
  // }

  // turns.forEach((turn) => {

  // });

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={(e) => {
                        if (!e.target.textContent) {
                          onSelectSquare(rowIndex, colIndex);
                        }
                      }}
                    >
                      {playerSymbol}
                    </button>
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
