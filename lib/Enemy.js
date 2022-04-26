const Potion = require('./Potion');
const Character = require('./Character');

// using extends, we were able to tell one class to inherit all of the methods from another class; combined with super(), we can then add extra properties to the child object
class Enemy extends Character {
    constructor(name, weapon) {
      super(name);
    // Enemy will still need to keep weapon and potion in its own constructor(), since those are unique to Enemy objects
    this.weapon = weapon;

    this.potion = new Potion();
}

  // concatenates the name and weapon
  getDescription() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
  };
}

module.exports = Enemy;