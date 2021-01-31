import Gameboard from "./Gameboard";

test("Gameboard initializes board properly every time", () => {
  for (let i = 0; i < 50; i += 1) {
    const gameboard = Gameboard();
    const board = gameboard.getBoard();
    expect(typeof board[0]).toBe("object");
    expect(board.length).toBe(100);
    expect(() => Gameboard()).not.toThrowError();
  }
});

test("missed attack is recorded properly", () => {
  const gameboard = Gameboard();
  let board = gameboard.getBoard();
  // find a location without a ship
  const getNonShipCoords = () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (board[i + 10 * j].ship === null) {
          return { i, j };
        }
      }
    }
    return new Error("No empty spaces were found.");
  };
  const { i, j } = getNonShipCoords();
  gameboard.receiveAttack(i, j);
  board = gameboard.getBoard();
  expect(board[i + 10 * j].attacked).toBe(true);
});

test("successful attack is recorded properly", () => {
  const gameboard = Gameboard();
  // find a location with a ship
  const getShipCoords = () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (gameboard.getBoard()[i + 10 * j].ship !== null) {
          return { i, j };
        }
      }
    }
    return new Error("No ship was found.");
  };
  const { i, j } = getShipCoords();
  gameboard.receiveAttack(i, j);
  expect(gameboard.getBoard()[i + 10 * j].attacked).toBe(true);
  // get the number of hits to the ship
  const { ship } = gameboard.getBoard()[i + 10 * j];
  let hitCount = 0;
  for (let k = 0; k < ship.length; k += 1) {
    if (ship.hitStatus[k].hit === true) {
      hitCount += 1;
    }
  }
  expect(hitCount).toBe(1);
});

test("reports that not all ships have been sunk", () => {
  const gameboard = Gameboard();
  gameboard.receiveAttack(1, 1);
  expect(gameboard.allShipsSunk()).toBe(false);
});

test("reports that all ships have been sunk", () => {
  const gameboard = Gameboard();
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      gameboard.receiveAttack(i, j);
    }
  }
  expect(gameboard.allShipsSunk()).toBe(true);
});
