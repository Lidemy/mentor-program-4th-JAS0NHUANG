function checkWinner(thisStoneColor, board, rowIndex, colIndex) {
  const xyArray = [
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 1],
  ];

  for (let i = 0; i < xyArray.length; i += 1) {
    let counter = 0;
    let [x, y] = xyArray[i];
    for (let j = 0; j < 2; j += 1) {
      const negativeHolderX = x;
      const negativeHolderY = y;
      while (
        rowIndex + x >= 0
        && colIndex + y >= 0
        && rowIndex + x <= 18
        && colIndex + y <= 18
        && thisStoneColor === board[rowIndex + x][colIndex + y]
      ) {
        counter += 1;
        x = negativeHolderX * (Math.abs(x) + 1);
        y = negativeHolderY * (Math.abs(y) + 1);
      }
      x = -negativeHolderX;
      y = -negativeHolderY;
    }
    if (counter >= 4) return thisStoneColor;
  }
  return null;
}

export default checkWinner;
