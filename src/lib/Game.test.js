import Game from "./Game";

test("game has two players", () => {
  const game = Game("Sam", "Computer");
  expect(game.player1.name).toBe("Sam");
  expect(game.player2.name).toBe("Computer");
});

test("two computer players finish a game successfully", () => {
  const game = Game("Computer 1", "Computer 2");
  return game
    .run()
    .then((winner) => {
      if (winner === game.player1 && game.gameboard2.allShipsSunk()) {
        return true;
      }
      if (winner === game.player2 && game.gameboard1.allShipsSunk()) {
        return true;
      }
      return false;
    })
    .then((result) => expect(result).toBe(true));
});
