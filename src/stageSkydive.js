class StageSkydive extends Phaser.Scene {
  constructor() {
    super({
      key: 'StageSkydive',
    });
  }

  init(data) {
    SubMode = {
      InFlight: 1,
      Landing: 2,
      Landed: 3,
    };

    this.DEBUG = false;

    this.submode = SubMode.InFlight;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.playerspeed = 2;
    this.base = new Phaser.Geom.Point(600, 300);
    this.goal = new Phaser.Geom.Point(
      Phaser.Math.RND.integerInRange(this.base.x - 200, this.base.x + 200),
      Phaser.Math.RND.integerInRange(this.base.y - 200, this.base.y + 200)
    );
    this.wiggle = 3;
    this.circle = new Phaser.Geom.Circle(600, 300, 250);
  }

  preload() {
    this.load.image('zielscheibe', require('./assets/zielscheibe.jpg'));
    this.load.image('dart', require('./assets/dart.png'));

    this.load.spritesheet(
      'bigexplosion',
      require('./assets/bigexplosion.png'),
      {
        frameWidth: 108,
        frameHeight: 121,
        endFrame: 24,
      }
    );
    this.load.audio('explosionsound', require('./assets/explosion.mp3'));
  }

  create() {
    this.add.text(600, 10, 'StageSkydive').setOrigin(0.5, 0);

    this.zielscheibe = this.add.image(this.base.x, this.base.y, 'zielscheibe');

    // this.pos = new Phaser.Geom.Point(600, 300); // Phaser.Geom.Point.Clone(this.base);
    this.dart = this.add.image(this.base.x, this.base.y, 'dart');

    this.circle_graphics = this.add.graphics(); // graphics object for drawing the circle
    if (this.DEBUG) {
      this.goal_graphics = this.add.graphics();
    }
    this.inter = 0;

    this.anims.create({
      key: 'boom',
      frames: this.anims.generateFrameNumbers('bigexplosion', {
        start: 0,
        end: 24,
      }),
      frameRate: 20,
    });
  }

  update(time) {
    switch (this.submode) {
      case SubMode.InFlight:
        this.updateInFlight(time);
        break;
      case SubMode.Landing:
        this.updateLanding(time);
        break;
      case SubMode.Landed:
        this.updateLanded(time);
        break;
    }
  }

  updateInFlight(time) {
    if (this.inter < 1) {
      this.inter += 0.007;
    } else {
      this.submode = SubMode.Landing;
    }

    // wiggle zielscheibe
    this.zielscheibe.x =
      this.base.x + Phaser.Math.RND.integerInRange(-this.wiggle, this.wiggle);
    this.zielscheibe.y =
      this.base.y + Phaser.Math.RND.integerInRange(-this.wiggle, this.wiggle);

    // circle x and y: linear interpolation from 600,300 (middle) to this.goal
    this.circle.x = Phaser.Math.Interpolation.Bezier(
      [this.base.x, this.goal.x],
      this.inter
    );
    this.circle.y = Phaser.Math.Interpolation.Bezier(
      [this.base.y, this.goal.y],
      this.inter
    );
    this.circle.radius = Phaser.Math.Interpolation.Bezier([300, 1], this.inter);

    // draw red circle
    this.circle_graphics.clear(); // clear to remove previously drawn circle
    this.circle_graphics.lineStyle(5, 0xff0000); // need to set it again because clear() erased this information
    this.circle_graphics.strokeCircleShape(this.circle);

    if (this.DEBUG) {
      this.goal_graphics.lineStyle(5, 0xff00ff); // need to set it again because clear() erased this information
      this.goal_graphics.strokeCircleShape(
        new Phaser.Geom.Circle(this.goal.x, this.goal.y, 1)
      );
    }

    // player movement
    if (this.cursors.left.isDown) {
      this.dart.x -= this.playerspeed;
    }
    if (this.cursors.right.isDown) {
      this.dart.x += this.playerspeed;
    }
    if (this.cursors.up.isDown) {
      this.dart.y -= this.playerspeed;
    }
    if (this.cursors.down.isDown) {
      this.dart.y += this.playerspeed;
    }
  }

  updateLanding(time) {
    this.dart.destroy();

    var boom = this.add.sprite(this.dart.x, this.dart.y, 'bigexplosion');
    boom.anims.play('boom');
    this.sound.play('explosionsound');

    var dist = Phaser.Math.Distance.Between(
      this.dart.x,
      this.dart.y,
      this.goal.x,
      this.goal.y
    );
    console.log('dist:' + dist);

    // minimum multiplier: 1 (at >=100 pixel distance); best multi: 4
    this.multi = 1 + Math.min(3, 3 - Math.min(3, dist / 33.3));
    this.multi = Math.round(this.multi * 100) / 100; // round to two decimal places
    console.log('multiplier:' + this.multi);

    this.submode = SubMode.Landed;
  }

  updateLanded(time) {
    // TODO: switch stage (or display highscore here) and pass this.multi as the result of this minigame
  }
}

module.exports = StageSkydive;
