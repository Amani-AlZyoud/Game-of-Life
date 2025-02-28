import "./globals.css";


export const metadata = {
  title: "Conway's Game of Life",
  description: "A visually engaging simulation of Conway's Game of Life, built with Next.js. Explore cellular automata in an interactive and dynamic environment.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
