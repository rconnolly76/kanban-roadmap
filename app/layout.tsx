import { ReactNode } from 'react';
import './globals.css'; // Optional, for global styles

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Project Roadmap</title>
        <meta name="description" content="Project Roadmap Kanban Board" />
      </head>
      <body>
        <header>
          <h1>My Project Roadmap</h1>
        </header>
        <main>{children}</main>
        <footer>Footer Content</footer>
      </body>
    </html>
  );
}