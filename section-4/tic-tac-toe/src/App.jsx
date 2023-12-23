import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import { useState } from 'react'
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver from './components/GameOver'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  // default currentPlayer value
  let currentPlayer = 'X';

  // if prevTurns is populated and previous player was 'X', the current player will have to be 'O'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  // deriving computed values from other computed values(gameBoard) which is derived from a state(gameTurns)
  for (const combination of WINNING_COMBINATIONS) {
    let firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    let secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    let thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      // winner = firstSquareSymbol;
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns){
  // deep copy
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
      console.log('SET ROWINDEX ' + row + ' COLINDEX ' + col + ' to ' + player);
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;


  // used until lecture 86
  // this state is removed because we should manage as little state as possible
  // the active player state can be derived from the gameTurns state already
  // const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer(currentActivePlayer => currentActivePlayer === 'X'? 'O' : 'X');

    setGameTurns(prevTurns => {
      // it's bad practice to have a state(activePlayer) be used in another state(gameTurns)
      // so we can just derive the current active player from this gameTurns state instead

      // default currentPlayer value
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex,  col: colIndex}, player: currentPlayer}, ...prevTurns];
      console.log(updatedTurns);

      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  // lift the state up to the common ancestor of components which will make use of the state, in this case its App
  // this is because App is the highest common ancestor of Player and GameBoard which will both utilize the activePlayer state (previous lecture)
  // this is because App is the highest common ancestor of GameBoard and Logs which will both utilize the gameTurns state 

  // parent passes the function which changes the state(in parent) to the child to be triggered there
  // parent passes the latest state value via props to the child after the state(in parent) has been changed from the child

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>

        {/* {winner && <p>You Won, {winner}!</p>} */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}

        {/* <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} /> */}
        {/* <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} /> */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
