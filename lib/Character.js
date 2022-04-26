// isAlive(), getHealth(), getAttackValue(), and reduceHealth() are the only methods that the Player and Enemy objects have in common, so those are the only methods we included on the Character() constructor
// if arrays can inherit methods from a parent constructor, then we can do the same thing with our own objects
// in this case, we want objects to inherit from the Character() constuctor
class Character {
  // the class in Player.js is already set up to call this method with super() and now we can pass along the name given to new Player()
  constructor(name = '') {
    this.name = name;
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
  }

  isAlive() {
    if (this.health === 0) {
      return false;
    }
    return true;
  };

  getHealth() {
    return `${this.name}'s health is now ${this.health}!`;
  };

  getAttackValue() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
  };

  reduceHealth(health) {
    this.health -= health;

    if (this.health < 0) {
      this.health = 0;
    }
  }
};

console.log(new Character().getHealth());

module.exports = Character;