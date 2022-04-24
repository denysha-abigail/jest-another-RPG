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

// verifies that a player's attack value is within range
test("gets player's attack value", () => {
    const player = new Player('Dave');
    player.strength = 10;
    // it's hard to test for randomness within a range; in this case, we don't opt to check for any number because the test will be too general to give specific feedback for a failing test; specificity will give the test more value and actionable feedback
    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// checks that a Potion was added correctly
test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());
    
    // we keep track of the old count so that we can ensure that adding a potion to our inventory actually increases the length of the player.inventory array; we are still using the Potion mock in this example because we are only focused on testing whether or not our Player has added the Potion to its inventory; if we used the actual Potion, then our test would no longer be an isolated unit test
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

// ensures that usePotion() removes the correct Potion from the Player inventory; eventually our Player will select which Potion to use from the inventory; we will use the index of the Potion to keep track of which one has been selected
test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    // we are keeping track of the old inventory length so that we can make sure the length decreases and doesn't go below zero
    expect(player.inventory.length).toBeLessThan(oldCount);
})