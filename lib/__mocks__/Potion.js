// Mocks allow us to fake assumed data, which allows the test to focus only on the logic it cares about
// simplified version of the Potion() constructor written in the actual Potion.js file
// The mock doesn't need to incorporate any random logic; it just needs to return valid values that the Player object can later use
module.exports = function() {
    this.name = 'health';
    this.value = 20;
};