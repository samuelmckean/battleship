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
    if (gameboard1.allShipsSunk()) return player2;
    if (gameboard2.allShipsSunk()) return player1;
    return null;
  };

  const takeTurn = (player, gameboard) => {
    player
      .attack()
      .then(({ x, y }) => gameboard.receiveAttack(x, y))
      .catch(() => new Error(`${player.name}'s move failed.`));
  };

  // loop until allShipsSunk on either of the Gameboards
  const run = async () => {
    try {
      while (!gameOver()) {
        // have players alternate taking turns with user going first
        // eslint-disable-next-line no-await-in-loop
        await takeTurn(player1, gameboard2);
        if (gameOver()) return player1;
        // eslint-disable-next-line no-await-in-loop
        await takeTurn(player2, gameboard1);
        if (gameOver()) return player2;
      }
      return new Error("Exited loop without either player winning");
    } catch {
      throw new Error("Error in making a move.");
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
