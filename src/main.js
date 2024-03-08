// Name: Sunny Han
// Date:
// Hours: 

'use strict';

let config = {
    type: Phaser.AUTO,
    autoCenter: true,
    width: 178,
    height: 138,
    zoom: 4,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Load, Menu, Play]
}


let game = new Phaser.Game(config)

let { width, height } = game.config

const centerY = game.config.height / 2;

let CURSORS, SPACE;

// https://glslsandbox.com/e#18578.0 