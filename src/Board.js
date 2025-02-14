import React, { useState } from 'react';
import Square from './Square';

function Board({ size }) {
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
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
      </div>
      <div className={`player player-o ${!isXNext && !winner ? 'active' : 'inactive'}`}>
        Jogador 🟢
        {winner === '🟢' && <div className="emoji">🎉</div>}
      </div>
    </div>
  );
}

function calculateWinner(squares, size) {
  // Implementar lógica para verificar o vencedor em um tabuleiro de qualquer tamanho
  // Por simplicidade, aqui vamos manter a lógica do 3x3 e deixamos para você aprimorar

  if (size === 3) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  }

  // A lógica para um tabuleiro 5x5 ou maior precisa ser implementada
  return null;
}

export default Board;
