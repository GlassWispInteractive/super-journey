/* eslint-disable no-undef */
const initCells = require('../src/maze');

describe('initCells', () => {
  it('should work', () => {
    expect(initCells(5, 5).length).toBe(5);
    expect(initCells(6, 5).length).toBe(5);

    const maze = initCells(5, 5);

    expect(maze[1][1]).toBeFalsy();
    expect(maze[3][1]).toBeFalsy();
    expect(maze[1][3]).toBeFalsy();
    expect(maze[3][3]).toBeFalsy();

    expect(maze[4][2]).toBeTruthy();
    expect(maze[0][1]).toBeTruthy();
    expect(maze[1][0]).toBeTruthy();
    expect(maze[0][0]).toBeTruthy();
  });
});
