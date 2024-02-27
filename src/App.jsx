import { useState } from 'react';

//? Import Components
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

//? Import Data
import { WINNING_COMBINATIONS } from './data/WinningCombinations';

//? Helper function for deriving current player
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//! Begin App Component
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((previousTurns) => {
      const currentPlayerSymbol = deriveActivePlayer(previousTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayerSymbol,
        },
        ...previousTurns,
      ];

      return updatedTurns;
    });
  }

  //? This derives the player symbol from gameTurns state for use in Player
  const currentPlayerSymbol = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const row = turn.square.row;
    const col = turn.square.col;
    const player = turn.player;

    gameBoard[row][col] = player;
  }

  for (let combination of WINNING_COMBINATIONS) {
    const winningMoves = combination.map((cell) => {
      return gameBoard[cell.row][cell.column];
    });
    // console.log(winningMoves);
    // console.log(winningMoves.every((move) => move === 'X'));
    const xWins = winningMoves.every((move) => move === 'X');
    const yWins = winningMoves.every((move) => move === 'O');
    if (xWins) {
      console.log(combination);
      console.log(winningMoves);
    }

    if (yWins) {
      console.log(combination);
      console.log(winningMoves);
    }

    // if (winningMoves.every((move) => move === 'X')) {

    //   console.log(winningMoves);
    // }
  }

  // const playerXMoves = gameTurns
  //   .filter((turn) => {
  //     return turn.player === 'X';
  //   })
  //   .map((turnObject) => turnObject.square);
  // const playerOMoves = gameTurns
  //   .filter((turn) => {
  //     return turn.player === 'O';
  //   })
  //   .map((turnObject) => turnObject.square);

  // console.log('player X moves', playerXMoves);
  // console.log('player O moves', playerOMoves);

  // if (playerXMoves.length >= 3 || playerOMoves.length >= 3) {
  // }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={'Player 1'}
            playerSymbol={'X'}
            isActive={currentPlayerSymbol === 'X'}
          />
          <Player
            name={'Player 2'}
            playerSymbol={'O'}
            isActive={currentPlayerSymbol === 'O'}
          />
        </ol>
        <GameBoard
          gameBoard={gameBoard}
          turns={gameTurns}
          onSelectSquare={handleSelectSquare}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
