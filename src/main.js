// Name: Sunny Han
// Date: 3/18/2024
// Hours: 25

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
    scene: [Load, Menu, Instructions, Play, Highscore, Credits]
}


let game = new Phaser.Game(config)

let { width, height } = game.config

let hearts = 0;
let flowers = 0;

const centerY = game.config.height / 2;

let CURSORS, SPACE;

// https://glslsandbox.com/e#18578.0 