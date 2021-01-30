// Player factory function
const Player = (name, computer = false) => {
  const previousMoves = [];

  const convertIndexToXY = (index) => ({
    x: Math.floor(index / 10),
    y: index % 10,
  });

  const attack = () => {
    if (computer) {
      let index = Math.floor(Math.random() * 100);
      while (previousMoves.includes(index)) {
        index = Math.floor(Math.random() * 100);
      }
      previousMoves.push(index);
      const { x, y } = convertIndexToXY(index);
      return Promise.resolve({ x, y });
    }
    return Promise.resolve({ x: 1, y: 1 });
  };

  return {
    name,
    attack,
  };
};

export default Player;
