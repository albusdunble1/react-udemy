// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null]
// ]

export default function GameBoard({onSelectSquare, board}) {

    // gameboard is a derived state from the turns(gameTurns in App) state
    // it is best practice to used derived state as much as possible from a main state
    // let gameBoard = initialGameBoard;

    // for (const turn of turns){
    //     const {square, player} = turn;
    //     const {row, col} = square;

    //     gameBoard[row][col] = player;
    //     console.log('SET ROWINDEX ' + row + ' COLINDEX ' + col + ' to ' + player);
    // }

    // console.log('LATEST GAMEBOARD')
    // console.log(gameBoard)

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);


    // function handleSelectSquare(rowIndex, colIndex) {
    //     // update the gameBoard in an immutable way (a new copy of the array is used without mutating the original array)
    //     setGameBoard(prevGameBoard => {
    //         const newGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         newGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return newGameBoard;
    //     })

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button disabled={playerSymbol} onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}