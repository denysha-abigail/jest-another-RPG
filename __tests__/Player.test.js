// when requiring modules, it is not necessary to include the .js file extension; node will assume that the file is a JS file is no extension is specified
const Player = require('../lib/Player');

test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
});

// to run a particular group of related tests (known as a test suite), modify the npm run command to call specific test files (i.e. npm run test Player)