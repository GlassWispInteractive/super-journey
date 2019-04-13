const Phaser = require('phaser');
const menu = require('./menu');
const stagePacman = require('./stagePacman');
const stageMario = require('./stageMario');
const stageSkydive = require('./stageSkydive');
const gameOver = require('./gameOver');
const credits = require('./credits');

var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  backgroundColor: '#000000',
  scene: [menu, stagePacman, stageMario, stageSkydive, gameOver, credits],
};

var game = new Phaser.Game(config);
