class StageMario extends Phaser.Scene {
  constructor() {
    super({
      key: 'StageMario',
    });
  }

  init(data) {
    console.log('data: ' + JSON.stringify(data));
  }

  preload() {
    this.load.image('face', require('./assets/logo.png'));
  }

  create() {
    this.add.text(100, 300, 'StageMario');

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('StageSkydive');
    });
  }
}

module.exports = StageMario;
