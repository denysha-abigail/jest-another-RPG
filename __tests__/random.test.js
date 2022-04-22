const randomNumber = require('../lib/random.js');

// test that expects the function checkIfEqual to be truthy when given 10 and 10 as arguments
test('gets random number between 1 and 10', () => {
    // expect is a specialty function from jest that returns a special expectation object that has access to matcher methods
    // expect() calls checkIfEqual function with its arguments, return that special expectation object and then use the toBe method to test the exact equality against returned result
                // expect(checkIfEqual(10,10)).toBe(true);
    expect(randomNumber()).toBeGreaterThanOrEqual(1);
    expect(randomNumber()).toBeLessThanOrEqual(10);
});