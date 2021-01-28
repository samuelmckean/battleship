const Ship = (locations) => {
  // get length of ship
  const length = locations.length;
  // initialize hitStatus array
  const hitStatus = [];
  for (let i = 0; i < length; i++) {
    hitStatus[i] = {
      index: locations[i],
      hit: false,
    };
  }

  const hit = (hitIndex) => {
    // iterate through the hitStatus to check that the given hitIndex is valid
    for (let i = 0; i < length; i++) {
      // check if spot has been hit before
      if (hitStatus[i].index === hitIndex && hitStatus[i].hit === true) {
        throw new Error('This location has already been hit');
      }
      // if it has not been hit, change hit to true and return
      if (hitStatus[i].index === hitIndex && hitStatus[i].hit === false) {
        hitStatus[i].hit = true;
        return;
      }
    }
    // could not find the given hitIndex on this ship
    throw new Error('Ship is not on this location');
  };

  const isSunk = () => {
    for (let i = 0; i < length; i++) {
      if (hitStatus[i].hit === false) {
        return false;
      }
    }
    return true;
  };

  return {
    length,
    hitStatus,
    hit,
    isSunk,
  };
}

export default Ship;
