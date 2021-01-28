import Gameboard from './Gameboard';

test('Gameboard initializes board properly every time', () => {
  for (let i = 0; i < 50; i++) {
    const gameboard = Gameboard();
    const board = gameboard.getBoard();
    expect(typeof board[0]).toBe('object');
    expect(board.length).toBe(100);
    expect(() => Gameboard()).not.toThrowError();  
  }
});

test('missed attack is recorded properly', () => {
  const gameboard = Gameboard();
  let board = gameboard.getBoard();
  // find a location without a ship
  const getNonShipCoords = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i + 10 * j].ship === null) {
          return { i, j };
        }
      }
    }
  }
  const { i, j } = getNonShipCoords();
  gameboard.receiveAttack(i, j);
  board = gameboard.getBoard();
  expect(board[i + 10 * j].attacked).toBe(true);
});

test('successful attack is recorded properly', () => {
  const gameboard = Gameboard();
  // find a location with a ship
  const getShipCoords = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (gameboard.getBoard()[i + 10 * j].ship !== null) {
          return { i, j };
        }
      }
    }
  }
  const { i, j } = getShipCoords();
  gameboard.receiveAttack(i, j);
  expect(gameboard.getBoard()[i + 10 * j].attacked).toBe(true);
  // get the number of hits to the ship
  const ship = gameboard.getBoard()[i + 10 * j].ship;
  let hitCount = 0;
  for (let i = 0; i < ship.length; i++) {
    if (ship.hitStatus[i].hit === true) {
      hitCount = hitCount + 1;
    }
  }
  expect(hitCount).toBe(1);
});

test('reports that not all ships have been sunk', () => {
  const gameboard = Gameboard();
  expect(gameboard.allShipsSunk()).toBe(false);
});

test('reports that all ships have been sunk', () => {
  const gameboard = Gameboard();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      gameboard.receiveAttack(i, j);
    }
  }
  expect(gameboard.allShipsSunk()).toBe(true);
});