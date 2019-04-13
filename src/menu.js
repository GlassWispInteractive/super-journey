class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: 'Menu',
    });
  }

  preload() {
    this.load.image('arrow', require('./assets/logo.png'));
  }

  create() {
    this.pic = this.add.image(400, 300, 'arrow').setOrigin(0, 0.5);

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('StagePacman');
    });

    this.add.text(100, 300, 'Phaser 3\nText Crop\nHell Yeah!');
  }

  update(time) {
    this.pic.rotation += 0.01;
  }
}

module.exports = Menu;
