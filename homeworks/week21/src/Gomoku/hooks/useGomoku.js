import { useState, useEffect } from 'react';
import checkWinner from '../utils/checkWinner';

let thisStoneColor = 'blue';
let winner = null;
let step = 0;

export default function useGomoku() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [records, setRecords] = useState([]);

  function handlePlaceStone(rowIndex, colIndex) {
    if (winner || board[rowIndex][colIndex] !== null) return;
    setBoard(
      board.map((row, mapRowIndex) => {
        if (rowIndex !== mapRowIndex) return row;
        return row.map((col, mapColIndex) => {
          if (mapColIndex !== colIndex) return col;
          if (board[rowIndex][colIndex] !== null) return col;
          return thisStoneColor;
        });
      }),
    );
    winner = checkWinner(thisStoneColor, board, rowIndex, colIndex);
    thisStoneColor = thisStoneColor === 'blue' ? 'green' : 'blue';
    step += 1;
  }

  useEffect(() => {
    const currentBoard = JSON.stringify(board);
    for (let i = 0; i < records.length; i += 1) {
      if (currentBoard === JSON.stringify(records[i].board)) {
        step = records[i].step;
        return;
      }
    }
    setRecords(() => {
      const newRecords = JSON.parse(JSON.stringify(records.slice(0, step)));
      return [
        ...newRecords,
        {
          step,
          thisStoneColor,
          board,
          winner,
        },
      ];
    });
  }, [board]);

  function handleRewind(event) {
    const indexValue = event.target.value;
    winner = records[indexValue].winner;
    setBoard(records[indexValue].board);
    thisStoneColor = records[indexValue].thisStoneColor;
  }

  return {
    board,
    records,
    handlePlaceStone,
    checkWinner,
    handleRewind,
    thisStoneColor,
    winner,
  };
}
