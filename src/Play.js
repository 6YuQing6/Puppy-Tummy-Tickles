class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    init() {
        this.playing = false
    }
    create(){
        this.background = this.add.image(0,0,'background').setOrigin(0,0);
        SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.puppy = new Puppy(this, 60, 110); 
        this.hand = new Hand(this, 100, 50);
        this.smallheart = this.add.sprite(18,18,'smallheart',0);
        this.bigheart = this.add.sprite(130,70,'bigheart',0);

        this.keys = this.input.keyboard.createCursorKeys();
        
    }
    update(){
        this.handFSM.step();
        // can have a move to function so set the position for the puppy to travel to, and will move until there
        // want the puppy to move randomly in one direction, then lay down for a certain amount of time, then get up
        this.puppyFSM.step();
    }
}