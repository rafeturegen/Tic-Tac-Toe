import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
  
    gameBoard[row][col] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRematch () {
    setGameTurns([]);
    setActivePlayer("X");
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        {(winner ||  hasDraw) ? <GameOver onRematch={handleRematch} winner={winner}/> : undefined}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;