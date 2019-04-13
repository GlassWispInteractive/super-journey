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
    var menuSelected = 0;
    var musicActivated = true;
    var soundActivated = true;
    var hasBeenLoaded = false;

    const menu = ['Start game', 'Load', 'Music On', 'Sound On', 'Credit'];
    let entries = Array(menu.length);

    this.add
      .text(600, 100, 'Super Journey', {
        fontFamily: 'Arial Black',
        fontSize: 74,
        color: '#c51b7d',
        align: 'center',
      })
      .setStroke('#de77ae', 16)
      .setAlpha(0.85)
      .setOrigin(0.5);

    for (let i = 0; i < menu.length; i++) {
      entries[i] = this.add
        .text(600, 250 + i * 50, menu[i], {
          fontFamily: 'Arial Black',
          fontSize: 36,
          color: '#c51b7d',
          align: 'center',
        })
        .setAlpha(0.85)
        .setOrigin(0.5);

      if (i == menuSelected) {
        entries[i].setStroke('#de77ae', 8);
      }
    }

    this.input.keyboard.on('keydown-DOWN', () => {
      menuSelected = (menuSelected + 1) % menu.length;
      entries.forEach(entry => entry.setStroke('', 0));
      entries[menuSelected].setStroke('#de77ae', 8);
    });

    this.input.keyboard.on('keydown-UP', () => {
      menuSelected = (menuSelected - 1) % menu.length;
      entries.forEach(entry => entry.setStroke('', 0));
      entries[menuSelected].setStroke('#de77ae', 8);
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      console.log(menuSelected);
      switch (menuSelected) {
        case 0:
          if (hasBeenLoaded) {
            this.scene.start('StagePacman');
          } else {
            this.scene.start('GameOver');
          }

          break;

        case 1:
          hasBeenLoaded = true;
          break;

        case 2:
          musicActivated = !musicActivated;
          entries[2].text = musicActivated ? 'Music On' : 'Music Off';
          break;

        case 3:
          soundActivated = !soundActivated;
          entries[3].text = soundActivated ? 'Sound On' : 'Sound Off';
          break;

        case 4:
          this.scene.start('Credits');
          break;
      }
    });
  }

  update(time) {}
}

module.exports = Menu;
