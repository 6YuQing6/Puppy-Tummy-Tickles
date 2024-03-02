class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    init() {
        this.playing = false
    }
    create(){
        this.menu = this.add.sprite(0,0,'menu',0).setOrigin(0,0);
        this.menu.play('menu_blink', true);
        SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if (SPACE.isDown){
            // console.log('space down')
            this.scene.start('playScene');
        }
    }
}