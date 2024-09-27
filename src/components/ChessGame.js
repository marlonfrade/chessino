import React, { useState, useEffect } from "react";
import ChessPiece from "./ChessPiece";
import MoveHistory from "./MoveHistory";

const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const ChessGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState("");

  const handlePieceClick = (row, col) => {
    const piece = board[row][col];
    if (!selectedPiece && piece && getPieceColor(piece) === currentPlayer) {
      setSelectedPiece({ row, col });
    } else if (selectedPiece) {
      if (isValidMove(selectedPiece, { row, col })) {
        const newBoard = movePiece(selectedPiece, { row, col });
        const move = generateMoveNotation(
          board[selectedPiece.row][selectedPiece.col],
          selectedPiece,
          { row, col }
        );
        setSelectedPiece(null);

        const nextPlayer = currentPlayer === "white" ? "black" : "white";
        const status = getGameStatus(newBoard, nextPlayer);

        setCurrentPlayer(nextPlayer);
        setMoveHistory([
          ...moveHistory,
          move + (status === "check" ? "+" : status === "checkmate" ? "#" : ""),
        ]);
        setGameStatus(status);
      } else {
        setSelectedPiece(null);
      }
    }
  };

  const getPieceColor = (piece) => {
    if (!piece) return null; // Retorna null se a peça for null ou undefined
    return piece === piece?.toUpperCase() ? "white" : "black";
  };

  const isValidMove = (from, to) => {
    const piece = board[from.row][from.col];
    const targetPiece = board[to.row][to.col];

    // Peça não pode capturar peça da mesma cor
    if (targetPiece && getPieceColor(piece) === getPieceColor(targetPiece)) {
      return false;
    }

    // Lógica específica para cada tipo de peça
    switch (piece?.toLowerCase()) {
      case "p":
        return isValidPawnMove(from, to);
      case "r":
        return isValidRookMove(from, to);
      case "n":
        return isValidKnightMove(from, to);
      case "b":
        return isValidBishopMove(from, to);
      case "q":
        return isValidQueenMove(from, to);
      case "k":
        return isValidKingMove(from, to);
      default:
        return false;
    }
  };

  const isValidPawnMove = (from, to) => {
    const direction =
      getPieceColor(board[from.row][from.col]) === "white" ? -1 : 1;
    const startRow =
      getPieceColor(board[from.row][from.col]) === "white" ? 6 : 1;

    // Movimento simples
    if (
      from.col === to.col &&
      from.row + direction === to.row &&
      !board[to.row][to.col]
    ) {
      return true;
    }

    // Movimento duplo na primeira jogada
    if (
      from.col === to.col &&
      from.row === startRow &&
      from.row + 2 * direction === to.row &&
      !board[to.row][to.col] &&
      !board[from.row + direction][from.col]
    ) {
      return true;
    }

    // Captura
    if (
      Math.abs(from.col - to.col) === 1 &&
      from.row + direction === to.row &&
      board[to.row][to.col]
    ) {
      return true;
    }

    return false;
  };

  const isValidRookMove = (from, to) => {
    return from.row === to.row || from.col === to.col;
  };

  const isValidKnightMove = (from, to) => {
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  };

  const isValidBishopMove = (from, to) => {
    return Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
  };

  const isValidQueenMove = (from, to) => {
    return isValidRookMove(from, to) || isValidBishopMove(from, to);
  };

  const isValidKingMove = (from, to) => {
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
    return rowDiff <= 1 && colDiff <= 1;
  };

  const movePiece = (from, to) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[to.row][to.col] = newBoard[from.row][from.col];
    newBoard[from.row][from.col] = null;
    setBoard(newBoard);
    return newBoard;
  };

  const generateMoveNotation = (piece, from, to) => {
    const pieceSymbol = piece.toUpperCase() === "P" ? "" : piece.toUpperCase();
    const fromSquare = `${String.fromCharCode(97 + from.col)}${8 - from.row}`;
    const toSquare = `${String.fromCharCode(97 + to.col)}${8 - to.row}`;
    return `${pieceSymbol}${fromSquare}-${toSquare}`;
  };

  const getGameStatus = (board, player) => {
    if (isInCheck(board, player)) {
      if (isCheckmate(board, player)) {
        return "checkmate";
      }
      return "check";
    }
    return "";
  };

  const isInCheck = (board, player) => {
    const kingPosition = findKing(board, player);
    const opponentColor = player === "white" ? "black" : "white";

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && getPieceColor(piece) === opponentColor) {
          if (isValidMove({ row, col }, kingPosition, board)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const isCheckmate = (board, player) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && getPieceColor(piece) === player) {
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              if (
                isValidMove({ row, col }, { row: toRow, col: toCol }, board)
              ) {
                const newBoard = movePiece(
                  { row, col },
                  { row: toRow, col: toCol },
                  [...board]
                );
                if (!isInCheck(newBoard, player)) {
                  return false;
                }
              }
            }
          }
        }
      }
    }
    return true;
  };

  const findKing = (board, player) => {
    const kingSymbol = player === "white" ? "K" : "k";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === kingSymbol) {
          return { row, col };
        }
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="chess-board mb-4 md:mb-0 md:mr-8">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="chess-row">
            {row.map((piece, colIndex) => (
              <div
                key={colIndex}
                className={`chess-square ${
                  (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
                } ${
                  selectedPiece &&
                  selectedPiece.row === rowIndex &&
                  selectedPiece.col === colIndex
                    ? "selected"
                    : ""
                } ${
                  piece && getPieceColor(piece) === currentPlayer
                    ? "selectable"
                    : ""
                }`}
                onClick={() => handlePieceClick(rowIndex, colIndex)}
              >
                {piece && <ChessPiece type={piece} />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="game-info">
        <MoveHistory moves={moveHistory} />
        <div className="game-status mt-4">
          <h3 className="text-lg font-semibold mb-2">Game Status</h3>
          <p>
            {gameStatus
              ? `${currentPlayer} is in ${gameStatus}`
              : `${currentPlayer}'s turn`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
