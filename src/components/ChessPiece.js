import React from "react";

const ChessPiece = ({ type }) => {
  const getPieceSymbol = (type) => {
    switch (type.toLowerCase()) {
      case "k":
        return "♔";
      case "q":
        return "♕";
      case "r":
        return "♖";
      case "b":
        return "♗";
      case "n":
        return "♘";
      case "p":
        return "♙";
      default:
        return "";
    }
  };

  return (
    <div
      className={`chess-piece ${
        type === type.toUpperCase() ? "white" : "black"
      }`}
    >
      {getPieceSymbol(type)}
    </div>
  );
};

export default ChessPiece;
