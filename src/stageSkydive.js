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
    this.load.image('zielscheibe', require('./assets/zielscheibe.jpg'));
    this.load.image('dude', require('./assets/dude.png'));
  }

  create() {
    this.DEBUG = true;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.text(400, 10, 'StageSkydive').setOrigin(0.5, 0);

    this.base = new Phaser.Geom.Point(400, 300);
    this.goal = new Phaser.Geom.Point(
      Phaser.Math.RND.integerInRange(this.base.x - 200, this.base.x + 200),
      Phaser.Math.RND.integerInRange(this.base.y - 200, this.base.y + 200)
    );
    this.wiggle = 0;
    this.zielscheibe = this.add.image(this.base.x, this.base.y, 'zielscheibe');

    // this.pos = new Phaser.Geom.Point(400, 300); // Phaser.Geom.Point.Clone(this.base);
    playerspeed = 2;
    this.player = this.add.image(this.base.x, this.base.y, 'dude');

    this.circle = new Phaser.Geom.Circle(400, 300, 250);
    this.circle_graphics = this.add.graphics(); // graphics object for drawing the circle
    if (this.DEBUG) {
      this.goal_graphics = this.add.graphics();
    }
    this.inter = 0;
  }

  update(time) {
    if (this.inter < 1) {
      this.inter += 0.007;
    }

    // wiggle zielscheibe
    this.zielscheibe.x =
      this.base.x + Phaser.Math.RND.integerInRange(-this.wiggle, this.wiggle);
    this.zielscheibe.y =
      this.base.y + Phaser.Math.RND.integerInRange(-this.wiggle, this.wiggle);

    // circle x and y: linear interpolation from 400,300 (middle) to this.goal
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
      this.player.x -= playerspeed;
    }
    if (this.cursors.right.isDown) {
      this.player.x += playerspeed;
    }
    if (this.cursors.up.isDown) {
      this.player.y -= playerspeed;
    }
    if (this.cursors.down.isDown) {
      this.player.y += playerspeed;
    }
  }
}

module.exports = StageSkydive;
