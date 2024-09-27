export const metadata = {
  title: "Play Chess - Chessino",
  description: "Enjoy your game and may the best player win!",
  keywords: "chess, play chess, chessino, online chess, chess game",
  author: "Chessino",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function PlayLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="viewport" content={metadata.viewport} />
      </head>
      <body className="bg-background text-foreground dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
