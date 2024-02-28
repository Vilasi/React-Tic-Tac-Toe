import { useState, useEffect } from 'react';

//? Import Components
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

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
  const [hasWinner, setHasWinner] = useState(false);
  const [gameResult, setGameResult] = useState(null);

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

  console.log(gameTurns);

  // This derives the player symbol from gameTurns state for use in Player
  const currentPlayerSymbol = deriveActivePlayer(gameTurns);

  // Initialize the game board with the initialGameBoard state
  let gameBoard = [...initialGameBoard].map((row) => [...row]);

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
        return 'X Has Won!';
      }

      if (yWins) {
        return 'O Has Won!';
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

  // let gameResult;

  useEffect(() => {
    if (!winner && draw) {
      console.log('Draw');
      setHasWinner((previousState) => !previousState);
      setGameResult('Draw');
    }
    if (winner && !draw) {
      setHasWinner((previousState) => !previousState);
      // gameResult = winner;
      setGameResult(winner);
    }
    if (winner && draw) {
      setHasWinner((previousState) => !previousState);
      setGameResult(winner);
      console.log(winner);
      // gameResult = winner;
    }
  }, [winner, draw]);

  function handleRematch() {
    setGameTurns([]);
    setHasWinner((previousState) => !previousState);
    setGameResult(null);
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
          gameOver={hasWinner}
          board={gameBoard}
          turns={gameTurns}
          onSelectSquare={handleSelectSquare}
        />
        {hasWinner ? (
          <GameOver winner={gameResult} rematch={handleRematch} />
        ) : null}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
