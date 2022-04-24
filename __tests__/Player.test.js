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
});

// test to get information about the player's health
test("gets player's health value", () => {
    const player = new Player('Dave');

    // concatenation is joining together multiple strings into a single string; the expect.stringContaining() method is an expect method that can be used to make sure our string includes our player's health
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('checks if player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    // here we are updating our Player health halfway through the test so that we can check for both conditions: true and false
    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

// reduceHealth() method is called twice
// a new Player is created in every test; our tests affect the Player object's property values and if we used the same object every time, we would no longer be testing properties and methods in isolation; essentially, it's important to create a new instance of the object we're testing in every test to give that test a fresh start
test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    // absurdly high value to make sure it never goes negative
    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});