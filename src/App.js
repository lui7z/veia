import React, { useState } from 'react';
import Board from './Board';
import DifficultySelection from './DifficultySelection';
import './App.css';

function App() {
  const [boardSize, setBoardSize] = useState(null);

  const handleSelectDifficulty = (size) => {
    setBoardSize(size);
  };

  return (
    <div className="App">
      <h1>Jogo da Velha</h1>
      {!boardSize ? (
        <DifficultySelection onSelect={handleSelectDifficulty} />
      ) : (
        <Board size={boardSize} />
      )}
    </div>
  );
}

export default App;
