import Ship from './Ship';

test('Ship returns an object', () => {
  expect(typeof Ship([1])).toBe('object');
});

test('Ship length matches argument', () => {
  const ship = Ship([1]);
  expect(ship.length).toBe(1);
});

test('Location in hitStatus matches the given location', () => {
  const ship = Ship([68]);
  expect(ship.hitStatus[0].index).toBe(68);
});

test('Last element on hitStatus is not hit to start', () => {
  const ship = Ship([1, 2, 3]);
  expect(ship.hitStatus[2].hit).toBe(false);
});

test('Hit function updates only that spot in hitStatus with a 1', () => {
  const ship = Ship([0, 1, 2]);
  ship.hit(1);
  expect(ship.hitStatus[1].hit).toBe(true);
  expect(ship.hitStatus[0].hit).toBe(false);
  expect(ship.hitStatus[2].hit).toBe(false);
});

test('Calling hit with an index that has already been hit returns an error', () => {
  const ship = Ship([0, 1, 2]);
  ship.hit(1);
  expect(() => ship.hit(1)).toThrowError();
});

test('isSunk returns false when only one spot of 3 has been hit', () => {
  const ship = Ship([1, 2, 3]);
  ship.hit(1);
  expect(ship.isSunk()).toBe(false);
});

test('isSunk returns true when all spots have been hit', () => {
  const ship = Ship([2, 3]);
  ship.hit(2);
  ship.hit(3);
  expect(ship.isSunk()).toBe(true);
});
