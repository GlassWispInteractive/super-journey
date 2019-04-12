const initCells = (xDimInput, yDimInput) => {
  const xDim = xDimInput - ((xDimInput + 1) % 2);
  const yDim = yDimInput - ((yDimInput + 1) % 2);

  const maze = Array(xDim)
    .fill(undefined)
    .map(() => Array(yDim).fill(true));

  for (let x = 1; x < xDim; x += 2) {
    for (let y = 1; y < yDim; y += 2) {
      maze[x][y] = false;
    }
  }

  return maze;
};

const generateMaze = (xDim, yDim) => initCells(xDim, yDim);

module.exports = generateMaze;
