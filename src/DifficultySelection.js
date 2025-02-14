import React from 'react';

function DifficultySelection({ onSelect }) {
  return (
    <div className="difficulty-selection">
      <h2>Escolha a Dificuldade</h2>
      <button onClick={() => onSelect(3)}>Tabuleiro 3x3</button>
      <button onClick={() => onSelect(5)}>Tabuleiro 5x5</button>
    </div>
  );
}

export default DifficultySelection;
