const Potion = require('../lib/Potion');

// similar to Potion() constructor but in this case, the name parameter sets a default empty string if no name is provided
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health'), new Potion()];

    // will create a getStats() method on every Player object that is created
    // returns an object with various player properties
    // the problem with using this.getStats() is that it creates new methods for each player; if you have a game that creates 100 Player objects, our code will create a hundred getStats() methods
    // when using prototype, you are only creating the method once on the constructor itself; new player objects simply inherit the method from the constructor rather than having their own instances of that method
    // DO NOT write these as Player.prototype.getStats = () => {}; arrow functions change what 'this' means; they bind 'this' to the parent lexical scope instead of the scope of the method; under normal lexical scope conditions, 'this' would self-reference the Player object; using arrow functions, 'this' now refers to whatever it means in the outer scope; in Node.js, the global 'this' is just an empty object and will cause all properties to become undefined
    Player.prototype.getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.health,
            agility: this.agility
        };
    };

    // will create a getInventory() method on every Player object that is created
    // returns the inventory array or false if empty
    Player.prototype.getInventory = function() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    Player.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    Player.prototype.isAlive = function() {
        if(this.health === 0) {
            return false;
        }
            return true;
    };

    Player.prototype.reduceHealth = function(health) {
        this.health -= health;

        // include conditional to ensure the health never goes negative
        if (this.health < 0) {
            this.health = 0;
        }
    };
}

module.exports = Player;