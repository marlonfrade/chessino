import Link from "next/link";
import ChessBoard from "@/components/ChessBoard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground dark:bg-gray-900 dark:text-white">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Chessino</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          The ultimate chess betting platform
        </p>
      </header>

      <main className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to play and win?
          </h2>
          <p className="mb-6">
            Challenge opponents, place bets, and showcase your chess skills!
          </p>
          <Link
            href="/play"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Start Playing
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Chess Board Preview
          </h2>
          <ChessBoard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Live Matches</h3>
            <p>Watch ongoing games and place your bets in real-time.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
            <p>See the top players and biggest winners on Chessino.</p>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-600 dark:text-gray-300">
        <p>&copy; 2023 Chessino. All rights reserved.</p>
      </footer>
    </div>
  );
}
