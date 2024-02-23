import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ updateActivePlayer, currentPlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleCellClick(rowIndex, colIndex) {
    updateActivePlayer();

    setGameBoard((previousGameBoard) => {
      // Since our array's elements are themselves arrays, the following creates a deep copy
      //-- That is, not only do we spread the parent array to the new copy, we spread each sub array
      //-- This ensures that the final copy is a true copy, and neither the parent array, nor the children arrays,
      //--- are just referencing the original array.
      const updatedGameBoard = [
        ...previousGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedGameBoard[rowIndex][colIndex] = currentPlayerSymbol;

      return updatedGameBoard;
    });
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((cell, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={(e) => {
                        {
                          if (!e.target.textContent) {
                            handleCellClick(rowIndex, colIndex);
                          }
                        }
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
