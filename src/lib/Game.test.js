import Game from "./Game";

test("game has two players", () => {
  const game = Game("Sam", "Computer");
  expect(game.player1.name).toBe("Sam");
  expect(game.player2.name).toBe("Computer");
});

test("two computer players finish a game successfully", () => {
  const game = Game("Computer 1", "Computer 2");
  expect(() => game.run()).not.toThrowError();
  const boardsSunk = game.gameboard1.allShipsSunk() + game.gameboard2.allShipsSunk();
  expect(boardsSunk).toBe(1);
});
