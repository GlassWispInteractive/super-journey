const Phaser = require('phaser');
const menu = require('./menu');
const stagePacman = require('./stagePacman');
const stageMario = require('./stageMario');
const stageSkydive = require('./stageSkydive');
const gameOver = require('./gameOver');

var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  backgroundColor: '#000000',
  parent: 'phaser-example',
  scene: [menu, stagePacman, stageMario, stageSkydive, gameOver],
};

var game = new Phaser.Game(config);
