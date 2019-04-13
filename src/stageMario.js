class StageMario extends Phaser.Scene {
  constructor() {
    super({
      key: 'StageMario',
    });

    this.score = 0;
    this.scoreText;
    this.data;
  }

  init(data) {
    this.data = data;
  }

  preload() {
    this.load.image('sky', 'src/assets/himmel.png');
    this.load.image('platform', 'src/assets/platform_choc.png');
    this.load.image('ground', 'src/assets/browni_boden.png');
    this.load.image('bacon', 'src/assets/bacon.png');
    this.load.image('burger', 'src/assets/burger.png');
    this.load.spritesheet('dude', 'src/assets/assassin_run.png', {
      frameWidth: 150,
      frameHeight: 140,
    });
  }

  create() {
    const collectStar = (player, bacon) => {
      bacon.disableBody(true, true);

      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
    };

    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();

    //browni ground Abstand 470 px
    for (i = 0; i < 5; ++i) {
      platforms
        .create(190 + i * 470, 690, 'ground')
        .setScale(2)
        .refreshBody();
    }

    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    player = this.physics.add.sprite(100, 250, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    //collect things
    bacons = this.physics.add.group({
      key: 'bacon',
      repeat: 10,
      setXY: { x: 12, y: 0, stepX: 100 },
    });
    burgers = this.physics.add.group({
      key: 'burger',
      repeat: 10,
      setXY: { x: 50, y: 0, stepX: 100 },
    });

    bacons.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    burgers.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(bacons, platforms);
    this.physics.add.collider(burgers, platforms);
    this.physics.add.overlap(player, bacons, collectStar, null, this);
    this.physics.add.overlap(player, burgers, collectStar, null, this);

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);

      if (player.x + player.width > this.game.config.width) {
        this.scene.start('StageSkydive', {
          ...this.data,
          marioScore: this.score,
        });
      }
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-630);
    }
  }
}

module.exports = StageMario;
