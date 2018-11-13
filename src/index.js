import Phaser from 'phaser';
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var platforms;

function preload () {
    this.load.image('sky', 'Assets/sky.png');
    this.load.image('ground', 'Assets/platform.png');
    this.load.image('star', 'Assets/star.png');
    this.load.image('bomb', 'Assets/bomb.png');
    this.load.spritesheet('dude', 
        'Assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create () {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}

function update () {
}