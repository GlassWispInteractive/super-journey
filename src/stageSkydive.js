class StageSkydive extends Phaser.Scene {
  constructor() {
    super({
      key: 'StageSkydive',
    });
  }

  init(data) {
    console.log('data: ' + JSON.stringify(data));
  }

  preload() {
    this.load.image('face', require('./assets/logo.png'));
  }

  create() {
    this.add.text(100, 300, 'StageSkydive');

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('GameOver');
    });
  }
}

module.exports = StageSkydive;
