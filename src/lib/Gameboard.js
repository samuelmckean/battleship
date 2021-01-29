import Ship from "./Ship";

const Gameboard = () => {
  // randomizes how to orient and where to place a new Ship
  const randomizePlacement = (board, shipLength) => {
    try {
      // randomize if the ship will be placed horizontally or vertically
      const orientation = Math.round(Math.random());
      let firstSpot;
      const locations = [];
      if (orientation === 1) {
        // if ship will be placed horizontally
        firstSpot =
          Math.floor(Math.random() * 9) * 10 + Math.floor(Math.random() * 9);
        for (let i = 0; i < shipLength; i += 1) {
          if (board[firstSpot + i].ship !== null) {
            throw new Error("Placed a ship on top of an existing ship");
          }
          // push the location into the locations array
          locations.push(firstSpot + i);
        }
        return locations;
      }
      // else ship will be placed vertically
      firstSpot = Math.floor(Math.random() * (10 - shipLength) * 10);
      for (let i = 0; i < shipLength; i += 1) {
        if (board[firstSpot + 10 * i].ship !== null) {
          throw new Error("Placed a ship on top of an existing ship");
        }
        // push the location into the locations array
        locations.push(firstSpot + 10 * i);
      }
      return locations;
    } catch {
      // if the function errors then try placing another ship instead
      return randomizePlacement(board, shipLength);
    }
  };

  // places a new Ship on the board
  const placeShip = (board, shipLength) => {
    // make a copy of the board
    const boardCopy = [...board];
    // get the ships randomized placement
    const locations = randomizePlacement(boardCopy, shipLength);
    const ship = Ship(locations);
    for (let i = 0; i < shipLength; i += 1) {
      try {
        boardCopy[locations[i]].ship = ship;
      } catch {
        throw new Error("Placed a ship outside the board");
      }
    }
    return boardCopy;
  };

  const initBoard = () => {
    // create a 100 item gameboard array
    let board = [];
    for (let i = 0; i < 100; i += 1) {
      board[i] = {
        ship: null,
        attacked: false,
      };
    }
    const shipLengths = [2, 3, 3, 4, 5];
    for (let i = 0; i < shipLengths.length; i += 1) {
      board = placeShip(board, shipLengths[i]);
    }
    return board;
  };

  let board = initBoard();

  // updates the board with the new board given
  const setBoard = (newBoard) => {
    board = [...newBoard];
  };

  // returns the board
  const getBoard = () => [...board];

  // updates the board when attacked and returns the ship at the given location if there is one
  const updateBoard = (attackIndex) => {
    let ship = null;
    // copy the board to prevent side effects
    const boardCopy = getBoard();
    if (boardCopy[attackIndex].attacked === true) {
      throw new Error("This position has already been attacked");
    } else {
      // change the attacked prop to true for the given index
      boardCopy[attackIndex].attacked = true;
      if (boardCopy[attackIndex].ship !== null) {
        ship = boardCopy[attackIndex].ship;
      }
    }
    return {
      updatedBoard: boardCopy,
      ship,
    };
  };

  // converts 10x10 xy coords to an index
  const convertXYtoIndex = (x, y) => x + 10 * y;

  // takes vertical and horizontal coordinates and updates the gameboard to represent an
  // attack on that location
  const receiveAttack = (horizontalCoord, verticalCoord) => {
    // converts the xy coords to an index
    const index = convertXYtoIndex(horizontalCoord, verticalCoord);
    // updates the board with the attack
    const { updatedBoard, ship } = updateBoard(index);
    setBoard(updatedBoard);
    // sends hit() to the correct ship if there is a ship
    if (ship) {
      ship.hit(index);
    }
  };

  // reports whether or not all the boards ships have been sunk
  const allShipsSunk = () => {
    const boardCopy = getBoard();
    // iterate through all spaces on the board
    for (let i = 0; i < 100; i += 1) {
      if (boardCopy[i].ship && boardCopy[i].ship.isSunk() === false) {
        return false;
      }
    }
    return true;
  };

  return {
    getBoard,
    receiveAttack,
    allShipsSunk,
  };
};

export default Gameboard;
