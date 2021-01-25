import Gameboard from './Gameboard';

test('Gameboard initializes board properly every time', () => {
  for (let i = 0; i < 100; i++) {
    const gameboard = Gameboard();
    expect(typeof gameboard.board[0]).toBe('object');
    expect(gameboard.board.length).toBe(100);
    expect(() => Gameboard()).not.toThrowError();  
  }
});