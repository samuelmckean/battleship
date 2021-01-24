const Ship = (length) => {
  // initialize hitStatus array
  const hitStatus = new Array(length);
  for (let i = 0; i < length; i++) {
    hitStatus[i] = 0;
  }

  const hit = (hitIndex) => {
    // check if spot has been hit before
    if (hitStatus[hitIndex] === 1) {
      throw new Error('Invalid move');
    }
    hitStatus[hitIndex] = 1
  };

  const isSunk = () => {
    for (let i = 0; i < length; i++) {
      if (hitStatus[i] === 0) {
        return false;
      }
      return true;
    }
  };

  return {
    length,
    hitStatus,
    hit,
    isSunk,
  };
}

export default Ship;
