"use client";
import React, { useState } from "react";

const initialBoardState = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardState);

  const renderSquare = (piece, rowIndex, colIndex) => {
    const isLightSquare = (rowIndex + colIndex) % 2 === 0;
    const squareClass = isLightSquare
      ? "chess-square light"
      : "chess-square dark";

    return (
      <div key={`${rowIndex}-${colIndex}`} className={squareClass}>
        {piece}
      </div>
    );
  };

  return (
    <div className="chess-board">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => renderSquare(piece, rowIndex, colIndex))
      )}
    </div>
  );
};

export default ChessBoard;
