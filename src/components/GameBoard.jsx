/**
 * GameBoard Component
 *
 * This component represents the game board of a tic-tac-toe game.
 * It receives the game board state and a function to handle square selection as props,
 * and renders a 3x3 grid of squares. Each square represents a cell on the game board.
 * The state of each cell (whether it's 'X', 'O', or null) is determined by the game board state.
 *
 * Props:
 * - board: A 2D array representing the current state of the game board.
 *   Each inner array represents a row on the game board.
 *   Each element in an inner array represents a cell on the game board and can be 'X', 'O', or null.
 * - onSelectSquare: A function to handle when a square is clicked.
 *   This function should take two arguments: the row and column of the clicked square.
 *
 * @param {Object} props The props for the component.
 * @param {Array<Array<string|null>>} props.board The current state of the game board.
 * @param {Function} props.onSelectSquare The function to handle when a square is clicked.
 * @returns {JSX.Element} The GameBoard component.
 */

export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {/* Map over each row in the board array */}
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {/* Map over each cell in the row */}
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => onSelectSquare(rowIndex, colIndex)}
                      disabled={playerSymbol !== null || !gameOver}
                    >
                      {/* Display the player's symbol ('X' or 'O', or 'null') */}
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
