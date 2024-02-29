import { useState, useEffect } from 'react';

//? Import Components
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

//? Import Data
import { WINNING_COMBINATIONS } from './data/WinningCombinations';

//! Initial Constants
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//! Helper functions ------------------------------------------------------------------------------------------------------------
//? Helper function for deriving current player
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

//? Define a function to moderate the game - determining who won
function gameModerator(gameBoard) {
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
      return 'X';
    }

    if (yWins) {
      return 'O';
    }
  }
}

//? This function iterates over each turn in the gameTurns state and derives the new gameBoard from the initial gameBoard state
function deriveGameBoard(gameTurns, gameBoard) {
  for (const turn of gameTurns) {
    // Extract the row and column from the turn's square
    const row = turn.square.row;
    const col = turn.square.col;

    // Extract the player from the turn
    const player = turn.player;

    // Update the game board at the row and column with the player's symbol
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

//! Begin App Component -------------------------------------------------------------------------------------------------------------------
function App() {
  const [players, setPlayers] = useState(PLAYERS);
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

  // This derives the player symbol from gameTurns state for use in Player
  const currentPlayerSymbol = deriveActivePlayer(gameTurns);

  // Initialize the game board with the INITIAL_GAME_BOARD state
  let gameBoard = [...INITIAL_GAME_BOARD].map((row) => [...row]);

  // Call deriveGameBoard function to build the updated gameBoard from gameTurns object array
  gameBoard = deriveGameBoard(gameTurns, gameBoard);

  // Call the gameModerator function to check if there's a winner
  let winner = gameModerator(gameBoard);

  // Initialize a variable to track if the game is a draw
  let draw = false;

  //? Determine if every square on the board is filled and there is no winner
  draw = gameTurns.length === 9 && !winner;

  useEffect(() => {
    if (!winner && draw) {
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
    }
  }, [winner, draw]);

  function handleRematch() {
    setGameTurns([]);
    setHasWinner((previousState) => !previousState);
    setGameResult(null);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((previousPlayerNames) => {
      return {
        ...previousPlayerNames,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            onNameChange={handlePlayerNameChange}
            name={PLAYERS.X}
            playerSymbol={'X'}
            isActive={currentPlayerSymbol === 'X'}
          />
          <Player
            onNameChange={handlePlayerNameChange}
            name={PLAYERS.O}
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
          <GameOver
            playerNames={players}
            winner={gameResult}
            onRestart={handleRematch}
          />
        ) : null}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
