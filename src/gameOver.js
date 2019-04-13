const niceText = require('./util/niceText');

class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOver',
    });
  }

  init(data) {
    this.data = data;
    this.score = 0; // TODO: extract the score from data
  }

  preload() {}

  create() {
    niceText(this, 'Game Over', 600, 250, 74);
    niceText(this, `Score: ${this.score}`, 600, 400, 36);

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Menu');
    });
  }
}

module.exports = GameOver;
