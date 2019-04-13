const COLOR_B = '#ded1fc';

const niceText = require('./util/niceText');

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

    niceText(this, 'Super Journey', 600, 100, 74);

    for (let i = 0; i < menu.length; i++) {
      entries[i] = niceText(this, menu[i], 600, 250 + i * 50, 36);

      if (i !== menuSelected) {
        entries[i].setStroke(COLOR_B, 0);
      }
    }

    this.input.keyboard.on('keydown-DOWN', () => {
      menuSelected = (menuSelected + 1) % menu.length;
      entries.forEach(entry => entry.setStroke('', 0));
      entries[menuSelected].setStroke(COLOR_B, 8);
    });

    this.input.keyboard.on('keydown-UP', () => {
      menuSelected = (menuSelected + menu.length - 1) % menu.length;
      entries.forEach(entry => entry.setStroke('', 0));
      entries[menuSelected].setStroke(COLOR_B, 8);
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
