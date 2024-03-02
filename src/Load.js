class Load extends Phaser.Scene {
    constructor(){
        super('loadScene')
    }

    preload(){
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, game.config.width * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // loads assets
        this.load.path = './assets/'
        // loads graphics 
        this.load.image('background', 'background.png');
        this.load.image('bigheart', 'bigheart.png');
        this.load.image('hand', 'hand.png');

        // loads spritesheets
        this.load.spritesheet('menu', 'menu-Sheet.png', {
            frameWidth: 178,
            frameHeight: 138,
        });
        this.load.spritesheet('puppy', 'puppy-Sheet.png', {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet('smallheart', 'smallheart-Sheet.png', {
            frameWidth: 23,
            frameHeight: 22,
        });
    }
    create(){
        // menu animation
        this.anims.create({
            key: 'menu_blink',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('menu', {
                start: 0,
                end: 1,
            })
        });

        // puppy animation
        this.anims.create({
            key: 'puppy_layDown',
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('puppy', {
                start: 0,
                end: 1
            })
        });
        this.anims.create({
            key: 'puppy_happy',
            frameRate: 2,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [1, 2]
            })
        });
        this.anims.create({
            key: 'puppy_stand',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
                start: 0,
                end: 0
            })
        });

        // heart animation
        this.anims.create({
            key: 'heartPLUS',
            frameRate: 14,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('smallheart', {
                start: 0,
                end: 13
            })
        });
        this.anims.create({
            key: 'heartMINUS',
            frameRate: 14,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('smallheart', {
                start: 13,
                end: 0
            })
        });

        this.scene.start('menuScene')
    }
}