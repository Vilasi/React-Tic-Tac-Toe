import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ changePlayer, currentPlayer }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleCellClick(index, cellIndex) {
    const currentGameBoard = [...gameBoard];
    currentGameBoard[index][cellIndex] = currentPlayer;

    setGameBoard(currentGameBoard);
    console.log(gameBoard);
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, index) => {
        return (
          <li key={index}>
            <ol>
              {row.map((cell, cellIndex) => {
                return (
                  <li key={cellIndex}>
                    <button
                      onClick={() => {
                        handleCellClick(index, cellIndex);
                        changePlayer();
                      }}
                    >
                      {cell}
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
