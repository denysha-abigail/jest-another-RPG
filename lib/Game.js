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

// this.intitializeGame() CALLS this.startNewBattle(), WHICH IN TURN CALLS this.battle()

// initializeGame() method using prototype syntax; this is where we'll set up the Enemy and Player objects
Game.prototype.initializeGame = function () {
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

            // kicks off the first battle and then called again anytime a new round starts
            this.startNewBattle()
        });
};

// establish who will take their turn first based on their agility values
Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    // display the Player object's stats
    console.log('Your stats are as follows:');
    // prints a formatted table of data
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    // will be responsible for each individual turn in the round
    this.battle()
};

// the battle() method is the main event of the game that will run an indefinite number of times; each time, it will either be the Player turn or the Enemy turn
// if Player turn:
// prompt user to attack or use a potion
// if using a Potion:
// display list of Potion objects to user
// apply selected Potion effect to Player
// if attacking:
// subtract health from the Enemy based on Player attack value

// if Enemy turn:
// subtract health from the Player based on Enemy attack value
Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                // if user selects 'use potion', it will require a follow-up prompt
                // if the user selects 'attack', we'll reduce the Enemy health using the same methods as before
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    // follow-up prompt
                    // if the inventory is empty, immediately return to end the Player turn
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return;
                    }
                    // if the inventory is not empty, then this code will execute and prompt the user for a specific Potion selection
                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            // Array.prototype.map() method; the map() method creates a new array based on the results of a callback function used in the original array
                            // Note that the map() callback has a second optional parameter to capture the index of the item; many users might not know that arrays start at zero, so adding 1 will make more sense to them. We can always subtract 1 later to get the true value
                            // when the user selects a Potion, the returned value will be a string like '2: agility'
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        // String.prototype.split() method; in this case, it splits on the ': ' -> thus, giving us an array with the number and Potion name (i.e. ['2', 'agility'])
                        // subtracting 1 from the number will put us back at the original array index
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                        });
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};



module.exports = Game;