import React, { useState } from 'react';
import Board from './Board';
import DifficultySelection from './DifficultySelection';
import './App.css';

function App() {
  const [boardSize, setBoardSize] = useState(null);

  const handleSelectDifficulty = (size) => {
    setBoardSize(size);
  };

  const handleReset = () => {
    setBoardSize(null);
  };

  return (
    <div className="App">
      <h1>Jogo da Velha</h1>
      {!boardSize ? (
        <DifficultySelection onSelect={handleSelectDifficulty} />
      ) : (
        <Board size={boardSize} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
