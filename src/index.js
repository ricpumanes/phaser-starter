import Phaser from 'phaser';

const gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
    width: 640, // game width
    height: 360, // game height
    scene: gameScene // our newly created scene
  };
  
  // create the game, and pass it the configuration
  let game = new Phaser.Game(config);

  gameScene.gameOver = function() {
    this.isPlayerAlive = false;
    this.cameras.main.shake(500);

    this.time.delayedCall(250, function() {
        this.cameras.main.fade(250);
      }, [], this);
    
    this.time.delayedCall(500, function() {
      this.scene.restart();
    }, [], this);
  }

  gameScene.init = function() {
    this.playerSpeed = 1.5;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
  }

  gameScene.preload = function() {
    this.load.image('background', 'Assets/background.png');
    this.load.image('player', 'Assets/player.png');
    this.load.image('dragon', 'Assets/dragon.png');
    this.load.image('treasure', 'Assets/treasure.png');
  }

  gameScene.create = function() {
    const bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0, 0);

    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
    this.player.setScale(0.5);

    this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
    this.treasure.setScale(0.5);

    this.enemies = this.add.group({
        key: 'dragon',
        repeat: 5,
        setXY: {
          x: 110,
          y: 100,
          stepX: 80,
          stepY: 20
        }
      });
    
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        enemy.speed = Math.random() * 2 + 1;
    }, this);

    this.isPlayerAlive = true;
    this.cameras.main.resetFX();
  }

  gameScene.update = function() {
      if (!this.isPlayerAlive) return;
      if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
      }
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
        this.gameOver();
      }
      const enemies = this.enemies.getChildren(); // []
      enemies.map((enemy) => {
        enemy.y += enemy.speed;
        if (enemy.y >= this.enemyMaxY && enemy.speed > 0) { enemy.speed *= -1; }
        if (enemy.y <= this.enemyMinY && enemy.speed < 0) { enemy.speed *= -1; }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds())) {
            this.gameOver();
        }
      });
  }