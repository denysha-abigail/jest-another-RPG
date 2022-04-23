// when requiring modules, it is not necessary to include the .js file extension; node will assume that the file is a JS file is no extension is specified
const Player = require('../lib/Player');
// imports the Potion() constructor into the test; thus, establishing Potion as a usable variable (otherwise, new Potion() would throw an error)
const Potion = require('../lib/Potion');

// mocks/replaces the constructor's implementation with our faked data; if new Potion() is ever called within the test file itself or any of the subsequent modules attached to the test, the mocked data will be returned
jest.mock('../lib/Potion');

// the name will always be 'health' and the value will always be 20 because the mocked potion replaced the real Potion() constructor
console.log(new Potion());

test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    // player's inventory should be an array containing an object
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

// to run a particular group of related tests (known as a test suite), modify the npm run command to call specific test files (i.e. npm run test Player)

test("gets player's stats as an object", () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
})