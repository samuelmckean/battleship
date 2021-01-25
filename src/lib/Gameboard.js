import Ship from './Ship';

const Gameboard = () => {
  const initBoard = () => {
    // create a 100 item gameboard array
    let board = [];
    for (let i = 0; i < 100; i++) {
      board[i] = {
        ship: null,
        attacked: false,
      };
    }
    const shipLengths = [2, 3, 3, 4, 5];
    for (let i = 0; i < shipLengths.length; i++) {
      board = placeShip(board, shipLengths[i]);
    }
    return board;
  }

  // randomizes how to orient and where to place a new Ship
  const randomizePlacement = (board, shipLength) => {
    try {
      // randomize if the ship will be placed horizontally or vertically
      const orientation = Math.round(Math.random());
      let firstSpot;
      if (orientation === 1) {
        // if ship will be placed horizontally
        firstSpot = Math.floor(Math.random() * 9) * 10 + Math.floor(Math.random() * 9);
        for (let i = 0; i < shipLength; i++) {
          if (board[firstSpot + i].ship !== null) {
            throw new Error('Placed a ship on top of an existing ship');
          }
          return {
            firstSpot: firstSpot,
            orientation: 'horizontal',
          }
        }
      } else {
        // else ship will be placed vertically
        firstSpot = Math.floor(Math.random() * (10 - shipLength) * 10);
        for (let i = 0; i < shipLength; i++) {
          if (board[firstSpot + 10 * i].ship !== null) {
            throw new Error('Placed a ship on top of an existing ship');
          }
          return {
            firstSpot: firstSpot,
            orientation: 'vertical',
          }
        }
      }
    } catch {
      // if the function errors then try placing another ship instead
      return randomizePlacement(board, shipLength);
    }
  }

  // places a new Ship on the board
  const placeShip = (board, shipLength) => {
    // make a copy of the board
    const boardCopy = [...board];
    const ship = Ship(shipLength);
    // get the ships randomized placement
    const { firstSpot, orientation } = randomizePlacement(boardCopy, shipLength);
    if (orientation === 'horizontal') {
      // if ship will be placed horizontally
      for (let i = 0; i < shipLength; i++) {
        try {
          boardCopy[firstSpot + i].ship = ship;
        } catch {
          throw new Error('Placed a ship outside the board');
        }
      }
    } else {
      // else ship will be placed vertically
      for (let i = 0; i < shipLength; i++) {
        try {
          boardCopy[firstSpot + 10 * i].ship = ship;
        } catch {
          throw new Error('Placed a ship outside the board');
        }
      }
    }
    return boardCopy;
  }

  const board = initBoard();

  return {
    board,
  }
}

export default Gameboard;
