import React, { useState } from 'react';
import Square from './Square';

function Board({ size, onReset }) {
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares, size) || newSquares[i]) {
      return;
    }
    newSquares[i] = isXNext ? '❌' : '🟢';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newSquares, size);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const renderBoard = () => {
    let board = [];
    for (let row = 0; row < size; row++) {
      let boardRow = [];
      for (let col = 0; col < size; col++) {
        boardRow.push(renderSquare(row * size + col));
      }
      board.push(<div key={row} className="board-row">{boardRow}</div>);
    }
    return board;
  };

  const status = winner ? 'Vencedor: ' + winner : 'Próximo jogador: ' + (isXNext ? '❌' : '🟢');

  return (
    <div className="board-container">
      <div className={`player player-x ${isXNext && !winner ? 'active' : 'inactive'}`}>
        Jogador ❌
        {winner === '❌' && <div className="emoji">🎉</div>}
      </div>
      <div className="board">
        <div className="status">{status}</div>
        {renderBoard()}
        <button className="reset-button" onClick={onReset}>Reset</button>
      </div>
      <div className={`player player-o ${!isXNext && !winner ? 'active' : 'inactive'}`}>
        Jogador 🟢
        {winner === '🟢' && <div className="emoji">🎉</div>}
      </div>
    </div>
  );
}

function calculateWinner(squares, size) {
  const lines = [];

  // Linhas
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    lines.push(row);
  }

  // Colunas
  for (let i = 0; i < size; i++) {
    const col = [];
    for (let j = 0; j < size; j++) {
      col.push(j * size + i);
    }
    lines.push(col);
  }

  // Diagonais
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - i - 1));
  }
  lines.push(diag1);
  lines.push(diag2);

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (
      squares[a] && squares[a] === squares[b] &&
      squares[a] === squares[c] && squares[a] === squares[d] &&
      squares[a] === squares[e]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
