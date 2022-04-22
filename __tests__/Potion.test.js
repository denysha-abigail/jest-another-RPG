const Potion = require('../lib/Potion.js');

// test to ensure that the new potion object has a name and value
// new keyword is used to create a new potion object
test('creates a health potion object', () => {
    const potion = new Potion('health');

    // we're assuming that when we create a new potion object, it will take the string we pass in and assign it to the potion's name
    // we specify that every potion should have a name property equal to health, and a value property equal to a number of some kind
    expect(potion.name).toBe('health');
    // the expect.any() method takes a constructor as an argument; here, we are expecting that the value property is created with a Number() constructor; in other words, we are allowing the value to be any number, rather than a number in a range so that the test has more flexibility
    expect(potion.value).toEqual(expect.any(Number));
});

// if the potion() constructor was called without any arguments we will have to create a new potion with a random type and value
test('creates a random potion object', () => {
    const potion = new Potion();

    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});