import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>React App (Nx monorepo scaffold)</h1>
      <p>Archive-workspace ready.</p>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

