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
      // Derive the current player's symbol ('X' or 'O') based on the gameTurns state
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

  // This derives the player symbol from gameTurns state for use in Player
  const currentPlayerSymbol = deriveActivePlayer(gameTurns);

  // Initialize the game board with the initialGameBoard state
  let gameBoard = initialGameBoard;

  // Iterate over each turn in the gameTurns state
  for (const turn of gameTurns) {
    // Extract the row and column from the turn's square
    const row = turn.square.row;
    const col = turn.square.col;

    // Extract the player from the turn
    const player = turn.player;

    // Update the game board at the row and column with the player's symbol
    gameBoard[row][col] = player;
  }

  //? Define a function to moderate the game
  function gameModerator() {
    // Initialize variables to track if 'X' or 'O' has won
    let xWins = false;
    let yWins = false;

    // Iterate over each winning combination
    for (let combination of WINNING_COMBINATIONS) {
      // Map the combination to the corresponding moves on the game board
      const winningMoves = combination.map((cell) => {
        return gameBoard[cell.row][cell.column];
      });

      // Check if all moves in the winningMoves are 'X' or 'O'
      xWins = winningMoves.every((move) => move === 'X');
      yWins = winningMoves.every((move) => move === 'O');

      if (xWins) {
        return 'X won';
      }

      if (yWins) {
        return 'O won';
      }
    }
  }
  // Call the gameModerator function to check if there's a winner
  let winner = gameModerator();

  // Initialize a variable to track if the game is a draw
  let draw = false;

  //? Determine if every square on the board is filled
  draw = gameBoard.every((column) => {
    return column.every((square) => {
      return square !== null;
    });
  });

  // If there's no winner and the game is a draw, log 'Draw'
  if (!winner && draw) {
    console.log('Draw');
    // If there's a winner and the game is not a draw, log the winner
  } else if (winner && !draw) {
    console.log(winner);
    // If there's a winner and the game board is fully filled, log the winner
  } else if (winner && draw) {
    console.log(winner);
  }

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
