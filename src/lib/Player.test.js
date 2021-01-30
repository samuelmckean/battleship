import Player from "./Player";

test("attacks the gameboard", () => {
  const sam = Player("Sam");
  return sam.attack().then(({ x, y }) => {
    expect(x).toBe(1);
    expect(y).toBe(1);
  });
});

test("computer player attacks randomly without duplicating moves", () => {
  const computer = Player("Computer", true);
  const movesMade = [];
  // push 100 moves into an array
  for (let i = 0; i < 100; i += 1) {
    movesMade.push(computer.attack());
  }
  // wait for all promises to be resolved
  return expect(
    Promise.all(movesMade).then((values) => {
      // convert x, y coords to index
      const indexArr = values.map(({x, y}) => x + 10 * y, 10);
      // sort the array numerically
      indexArr.sort((a, b) => a - b);
      // check that all values 0 - 99 are in the array
      for (let j = 0; j < 100; j += 1) {
        if (indexArr[j] !== j)
          return false;
      }
      return true;
    })
  // test that Promise.all resolves to 100
  ).resolves.toBe(true);
});
