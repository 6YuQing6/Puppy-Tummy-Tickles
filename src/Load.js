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
        this.load.image('flower', 'flower.png')
        this.load.image('cloud', 'clouds.png')

        // loads sounds
        this.load.audio('puppyMove', 'sounds/handMove.wav');
        this.load.audio('handMove', 'sounds/puppyMove1.mp3');
        this.load.audio('heartIncrease', 'sounds/heartincrease.mp3');
        this.load.audio('heartDecrease', 'sounds/heartdecrease.wav');
        this.load.audio('tickle', 'sounds/sfx_movement_portal5.wav');
        this.load.audio('puppyBark', 'sounds/Dog1.wav')
        /* 
        Music from #Uppbeat (free for Creators!):
        https://uppbeat.io/t/kevin-macleod/itty-bitty-8-bit
        License code: JEPNRDXVBUOWZIMK
        */
        this.load.audio('bgm1','sounds/itty-bitty-8-bit-kevin-macleod-main-version-03-13-7983.mp3')
        /*
        Music from #Uppbeat (free for Creators!):
        https://uppbeat.io/t/michael-grubb/floating-cat
        License code: ZVNZ9KGR2I6WCWWW
        */
        this.load.audio('bgm2', 'sounds/floating-cat-michael-grubb-main-version-24551-01-53.mp3')
        //https://www.fesliyanstudios.com/royalty-free-music/downloads-c/8-bit-music/6
        this.load.audio('bgm', 'sounds/2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios.com.mp3');

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

        // load sound https://opengameart.org/content/8-bit-sound-effects-library
        // https://opengameart.org/content/dog-sounds 
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
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [0, 8]
            })
        });
        this.anims.create({
            key: 'puppy_happy',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [14,15,16]
            })
        });
        this.anims.create({
            key: 'puppy_stand',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [0, 1, 2, 1]
            })
        });
        this.anims.create({
            key: 'puppy_sad',
            frameRate: 12,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [17, 18]
            })
        });

        // heart animation
        this.anims.create({
            key: 'heartPLUS',
            frameRate: 33,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('smallheart', {
                start: 0,
                end: 13
            })
        });
        this.anims.create({
            key: 'heartMINUS',
            frameRate: 33,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('smallheart', {
                start: 13,
                end: 0
            })
        });

        this.scene.start('menuScene')
    }
}