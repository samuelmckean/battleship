import Player from "./Player";
import Gameboard from "./Gameboard";

const Game = (player1Name, player2Name, numberOfHumanPlayers = 0) => {
  // create player and computer players
  let player1;
  let player2;
  switch (numberOfHumanPlayers) {
    case 0:
      player1 = Player(player1Name, true);
      player2 = Player(player2Name, true);
      break;
    case 1:
      player1 = Player(player1Name);
      player2 = Player(player2Name, true);
      break;
    default:
      player1 = Player(player1Name);
      player2 = Player(player2Name);
  }

  // create two gameboards
  const gameboard1 = Gameboard();
  const gameboard2 = Gameboard();

  // checks if the game is over; returns the winner if true and null if false
  const gameOver = () => {
    if (gameboard1.allShipsSunk()) return player1;
    if (gameboard2.allShipsSunk()) return player2;
    return null;
  };

  // loop until allShipsSunk on either of the Gameboards
  const run = () => {
    while (!gameOver()) {
      // have players alternate taking turns with user going first
      player1
        .attack()
        .then(({ x, y }) => gameboard1.receiveAttack(x, y))
        .catch(() => new Error(`${player1.name} move failed.`));
      if (gameOver()) break;
      player2
        .attack()
        .then(({ x, y }) => gameboard2.receiveAttack(x, y))
        .catch(() => new Error(`${player2.name} move failed.`));
    }
  };

  return {
    player1,
    player2,
    gameboard1,
    gameboard2,
    run,
  };
};

export default Game;
