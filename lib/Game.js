// The inquirer package provides user-friendly options for prompting a user on the command line. The user's answers are then returned in asynchronous callback functions. 
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    // currentEnemy and player are both currently undefined here but will be assigned when the initializeGame() method is called
    this.currentEnemy;
    this.player;
}

// initializeGame() method using prototype syntax; this is where we'll set up the Enemy and Player objects
Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // to keep track of which Enemy object is currently fighting the Player; when the game starts, this would be the first object in the array
    this.currentEnemy = this.enemies[0];

// prompt the user for their name, which will become the Player name
inquirer
  .prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
  })
  // destructure name from the prompt object
  .then(({ name }) => {
    this.player = new Player(name);

    // test the object creation
    // console.log(this.currentEnemy, this.player);
    this.startNewBattle()
  });
};

module.exports = Game;