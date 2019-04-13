const niceText = require('./util/niceText');

class Credits extends Phaser.Scene {
  constructor() {
    super({
      key: 'Credits',
    });
  }

  init(data) {
    console.log('data: ' + JSON.stringify(data));
  }

  preload() {}

  create() {
    const programmers = ['Alex', 'Danny', 'Justin', 'Lenny'];

    niceText(this, 'Credits to', 600, 100, 74);

    for (let i = 0; i < programmers.length; i++) {
      niceText(this, programmers[i], 600, 250 + i * 50, 36);
    }

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Menu');
    });
  }
}

module.exports = Credits;
