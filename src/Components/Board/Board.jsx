import { useEffect, useState } from "react";
import Square from "../Square/Square";

import "./Board.scss";

function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState(["", "", "", "", "", "", "", ""]);
  const [reset, setReset] = useState(false);
  const [strike, setStrike] = useState();
  const [validSquares, setValidSquares] = useState([]);

  const setPlayer = (id) => {
    if (reset) {
      setReset(false);
    }
    const newBoard = [...board];
    if (!newBoard[id]) {
      newBoard[id] = currentPlayer;

      setBoard(newBoard);
      if (currentPlayer === "X") {
        setCurrentPlayer("O");
      } else {
        setCurrentPlayer("X");
      }
    }
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    checkHorizontal();
    checkVertical();
    checkLeftDiagonal();
    checkRightDiagonal();
  };

  const checkHorizontal = () => {
    for (let i = 0; i <= 6; i += 3) {
      let winner = board[i];
      const squares = [i];
      for (let j = i; j <= i + 2; j++) {
        if (winner) {
          if (board[j] !== winner) {
            winner = false;
            break;
          } else {
            squares.push(j);
          }
        } else break;
      }
      if (winner) {
        setWinner(winner);
        setStrike("horizontal");
        setValidSquares(squares);
        return;
      }
    }
  };

  const checkVertical = () => {
    for (let i = 0; i <= 2; i++) {
      let winner = board[i];
      const squares = [i];
      for (let j = i; j <= 8; j += 3) {
        if (winner) {
          if (board[j] !== winner) {
            winner = false;
            break;
          } else {
            squares.push(j);
          }
        } else break;
      }
      if (winner) {
        setWinner(winner);
        setStrike("vertical");
        setValidSquares(squares);
        return;
      }
    }
  };

  const checkLeftDiagonal = () => {
    let winner = board[0];
    const squares = [0];
    for (let i = 0; i <= 8; i += 4) {
      if (winner) {
        if (board[i] !== winner) {
          winner = false;
          break;
        } else {
          squares.push(i);
        }
      } else break;
    }
    if (winner) {
      setWinner(winner);
      setStrike("left-diagonal");
      setValidSquares(squares);
      return;
    }
  };

  const checkRightDiagonal = () => {
    let winner = board[6];
    const squares = [6];
    for (let i = 6; i >= 2; i -= 2) {
      if (winner) {
        if (board[i] !== winner) {
          winner = false;
          break;
        } else {
          squares.push(i);
        }
      } else break;
    }
    if (winner) {
      setWinner(winner);
      setStrike("right-diagonal");
      setValidSquares(squares);
      return;
    }
  };

  const resetBoard = () => {
    setWinner("");
    setBoard(["", "", "", "", "", "", "", ""]);
    setStrike("");
    setValidSquares([]);
    setReset(true);
  };

  return (
    <div>
      <h2>Next Player: {currentPlayer}</h2>
      <h2 className="winner">Winner: {winner}</h2>
      <div className="board">
        <div className="grid">
          {Array.from(Array(9).keys()).map((ele) => (
            <Square
              id={ele}
              setPlayer={setPlayer}
              disabled={winner}
              reset={reset}
              currentPlayer={currentPlayer}
              strike={strike}
              validSquares={validSquares}
            />
          ))}
        </div>
      </div>
      {winner && (
        <button className="resetButton" onClick={resetBoard}>
          RESET
        </button>
      )}
    </div>
  );
}

export default Board;
