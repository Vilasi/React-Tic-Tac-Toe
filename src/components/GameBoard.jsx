import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const row = turn.square.row;
    const col = turn.square.col;
    const player = turn.player;

    gameBoard[row][col] = player;
  }

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
