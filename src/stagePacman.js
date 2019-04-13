class StagePacman extends Phaser.Scene {
  constructor() {
    super({
      key: 'StagePacman',
    });
  }

  init(data) {
    console.log('data: ' + JSON.stringify(data));
  }

  preload() {
    this.load.image('face', require('./assets/logo.png'));
  }

  create() {
    this.add.text(100, 300, 'StagePacman');

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('StageMario');
    });
  }
}

module.exports = StagePacman;
