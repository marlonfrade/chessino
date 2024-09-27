"use client";
import { useState, useEffect } from "react";
import ChessGame from "@/components/ChessGame";
import Link from "next/link";

export default function Play() {
  const [gameStatus, setGameStatus] = useState("waiting");
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    // Simulate fetching opponent data
    setTimeout(() => {
      setOpponent("Player 2");
      setGameStatus("ready");
    }, 2000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground dark:bg-gray-900 dark:text-white">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Chess Game</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Play against your opponent and showcase your skills!
        </p>
      </header>

      <main className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {gameStatus === "waiting"
              ? "Waiting for an opponent..."
              : `Playing against ${opponent}`}
          </h2>
          {gameStatus === "ready" && (
            <div className="mb-6">
              <ChessGame />
            </div>
          )}
          {gameStatus === "waiting" && (
            <p className="mb-6">
              Please wait while we find an opponent for you...
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Game Instructions</h3>
            <p>Move your pieces strategically to checkmate your opponent.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Game Status</h3>
            <p>
              {gameStatus === "waiting"
                ? "Waiting for an opponent..."
                : "Game in progress"}
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-600 dark:text-gray-300">
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </Link>
      </footer>
    </div>
  );
}
