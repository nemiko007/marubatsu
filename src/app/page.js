"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [xTurn, setXTurn] = useState(true);
  const [boardData, setBoardData] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    checkWinner();
    if (!xTurn && winner === null) {
      // 敵（コンピュータ）が自動で×を配置
      const emptySquares = boardData.map((value, index) => (value === "" ? index : null)).filter((index) => index !== null);
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const computerMove = emptySquares[randomIndex];
      const newBoardData = [...boardData];
      newBoardData[computerMove] = "X";
      setBoardData(newBoardData);
      setXTurn(true);
    }
  }, [boardData, xTurn, winner]);

  const checkWinner = () => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
        setWinner(boardData[a]);
        return;
      }
    }

    if (boardData.every((value) => value !== "")) {
      setWinner("DRAW");
    }
  };

  const handleSquareClick = (index) => {
    if (boardData[index] === "" && !winner) {
      const newBoardData = [...boardData];
      newBoardData[index] = xTurn ? "O" : "X"; // 自分のターンは〇を配置
      setBoardData(newBoardData);
      setXTurn(!xTurn);
    }
  };

  const handleResetClick = () => {
    setBoardData(Array(9).fill(""));
    setWinner(null);
    setXTurn(true);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game__menu">
          {winner ? (
            <p>{winner === "DRAW" ? "DRAW" : `${winner} WIN`}</p>
          ) : (
            <p>{xTurn ? "Your Turn (〇)" : "Computer's Turn (×)"}</p>
          )}
        </div>
        <div className="game__board">
          {boardData.map((value, index) => (
            <div
              key={index}
              className="square"
              onClick={() => handleSquareClick(index)}
            >
              {value}
            </div>
          ))}
        </div>
        {winner && (
          <button onClick={handleResetClick}>Reset</button>
        )}
      </div>
    </div>
  );
}
