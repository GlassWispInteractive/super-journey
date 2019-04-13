const Phaser = require('phaser');
const menu = require('./menu');
const stagePacman = require('./stagePacman');
const stageMario = require('./stageMario');
const stageSkydive = require('./stageSkydive');
const gameOver = require('./gameOver');
const credits = require('./credits');

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  scene: [menu, stagePacman, stageMario, stageSkydive, gameOver, credits],
};

new Phaser.Game(config);
