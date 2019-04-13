class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOver',
    });
  }

  init(data) {
    console.log('data: ' + JSON.stringify(data));
  }

  preload() {
    this.load.image('face', require('./assets/logo.png'));
  }

  create() {
    this.add.text(100, 300, 'GameOver');

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Menu');
    });
  }
}

module.exports = GameOver;
