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
    const programmers = ['Danny', 'Justin', 'Alex', 'Lenny'];

    this.add
      .text(600, 100, 'Credits to', {
        fontFamily: 'Arial Black',
        fontSize: 74,
        color: '#c51b7d',
        align: 'center',
      })
      .setAlpha(0.85)
      .setOrigin(0.5)
      .setStroke('#de77ae', 16);

    for (let i = 0; i < programmers.length; i++) {
      this.add
        .text(600, 250 + i * 50, programmers[i], {
          fontFamily: 'Arial Black',
          fontSize: 36,
          color: '#c51b7d',
          align: 'center',
        })
        .setAlpha(0.85)
        .setOrigin(0.5)
        .setStroke('#de77ae', 8);
    }

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Menu');
    });
  }
}

module.exports = Credits;
