// constructor functions act like blueprints for objects; because they don't have a return statement, they return undefined by default; unlike a regular function, however, they are meant to be used in conjunction with the new keyword

// populate naming conventions = capitalize constructor functions
class Potion {
    // constructor is necessary because we want to be able to supply an argument to the class (i.e. new Potion('health')); if the class wasn't intended to receive arguments, the constructor() could be omitted
    constructor(name) {
        this.types = ['strength', 'agility', 'health'];
        // if name is truthy, then this.name = name; if name is not truthy, then this.name = this.types[Math.floor(Math.random() * this.types.length)] -> a random type of potion
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        // if the potion is a health potion, its value is a number between 30 and 40
        if (this.name === 'health') {
            this.value = Math.floor(Math.random() * 10 + 30);
        } else {
            // if not a health potion, the potion constructor will take in the name parameter and assign the value property to be a random number between 7 and 12
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
}




module.exports = Potion;