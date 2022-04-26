const Potion = require('../lib/Potion');
const Character = require('./Character');

// similar to Potion() constructor but in this case, the name parameter sets a default empty string if no name is provided
class Player extends Character {
    constructor(name = '') {
        // used to reference the parent object; in a constructor(), calling super() will call the constructor() of the parent
        // even though the Character class doesn't have its own constructor method, one still exists underneath the hood to set up the object
        // when we call super(name), it passes the name argument to the constructor() of the Character class, where name and other properties like health are officially defined
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    }

    // using JavaScript's prototypal inheritance, Player() and Enemy() constructors can now inherit from Character()

    // this concept of inheritance is one of the main principles of object-oriented programming and isn't unique to JavaScript; the other three principles of OOP is encapsulation (objects can privatize some of their data and only expose them through public methods like getName()), abstraction (object methods are easy to use without needing to understand their complex inner workings), and polymorphism (objects(and their methods) can change depending on the context; for example, the Car and Plane objects might inherit from Vehicle, but their move() methods are very different)

    // OOP is a model that organizes software development around data or objects rather than just functions and logic

    // ** encapsulation : the idea that the state and data of each object are privately held inside of a class; other objects should not have access to data inside of that class but rather will need to call public method to return that data; this protects data that is stored inside of a class

    // ** inehritance : allows a parent-child type relationship among classes; all child class inherit the methods of their parents classes 

    // abstraction : allows us to hide complex logic behind an easy-to-use interface; you don't need to know what happens behind the scenes

    // polymorphism (aka method overload) : allows us to create one class but have it do something different based on the number or type of parameters we send it

    // will create a getStats() method on every Player object that is created
    // returns an object with various player properties
    // when using prototype, you are only creating the method once on the constructor itself; new player objects simply inherit the method from the constructor rather than having their own instances of that method
    // DO NOT write these as Player.prototype.getStats = () => {}; arrow functions change what 'this' means; they bind 'this' to the parent lexical scope instead of the scope of the method; under normal lexical scope conditions, 'this' would self-reference the Player object; using arrow functions, 'this' now refers to whatever it means in the outer scope; in Node.js, the global 'this' is just an empty object and will cause all properties to become undefined
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.health,
            agility: this.agility
        };
    };

    // will create a getInventory() method on every Player object that is created
    // returns the inventory array or false if empty
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    addPotion(potion) {
        // .push() is an array method that adds an item to the end of an array
        // when a Player drinks a Potion, the potion needs to be removed from their inventory and their stats need to be adjusted accordingly
        this.inventory.push(potion);
    };

    usePotion(index) {
        // the splice() method removes items from an array and returns the removed item(s) as a new array; in essence, two things are happening: the original inventory array has a single Potion removed at the specificed index value and put into a new "removed items" array; then the Potion at index [0] of this "removed items" array is saved in a potion variable
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    }
}

module.exports = Player;