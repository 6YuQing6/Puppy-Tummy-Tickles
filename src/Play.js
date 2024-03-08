class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    init() {
        this.playing = false
    }
    create() {
        this.background = this.add.image(0,0,'background').setOrigin(0,0);
        SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.puppy = new Puppy(this, 60, 110); 
        this.puppy.setDepth(100);
        this.hand = new Hand(this, 100, 50);
        this.hand.setDepth(101);
        this.hearts = new Hearts(this, 12, 12, 3);
        this.hearts.initialize();
        this.bigheart = this.add.sprite(0,0,'bigheart',0).setVisible(false);
        this.barkSFX = this.sound.add('puppyBark', {volume: 2});
        this.bgm = this.sound.add('bgm1', {volume: 0.2});
        this.bgm.play();
        this.flower = new Flower(this, 100, 110);
        this.flowergroup = this.add.group({
            runChildUpdate: true
        });
        this.flowergroup.add(this.flower);

        this.keys = this.input.keyboard.createCursorKeys();

        // adds flower creator
        this.time.addEvent({
            delay: this.flower.spawnRate,
            callback: () => {
                let randomX = Phaser.Math.Between(this.flower.width, width-this.flower.width);
                while (this.puppy.x + 20 > randomX && randomX > this.puppy.x - 20){
                    randomX = Phaser.Math.Between(this.flower.width, width-this.flower.width);
                } // x + 5 > this.x && this.x > x - 5
                let flower = new Flower(this, randomX, 110);
                this.flowergroup.add(flower);
                console.log('flower added', flower.x, flower.y);
            },
            callbackScope: this,
            loop: true
        });
        
        // // adds hand flower collision
        // this.physics.world.on('overlap', (hand, flower)=>{
        //     flower.destroy();
        // });

        // // adds puppy flower collision
        // this.physics.world.on('overlap', (puppy, flower)=>{
        //     this.hearts.removeHeart();
        //     flower.destroy();
        // })

    }
    update() {
        this.handFSM.step();
        this.puppyFSM.step();

        // // adds event checker for overlap
        this.physics.overlap(this.hand, this.flowergroup, (hand, flower)=>{
            flower.destroy();
        });

        this.physics.overlap(this.puppy,this.flowergroup, (puppy, flower)=>{
            this.hearts.removeHeart();
            flower.destroy();
        });
        // this.physics.overlap(this.hand, this.puppy);

        // adds hand puppy collision
        this.physics.overlap(this.hand, this.puppy, (hand, puppy)=>{
            if (puppy.layingDown == true && !puppy.tickled){
                console.log('tickled');
                puppy.happyPet();
                puppy.tickled = true;
                this.barkSFX.play();
                // creates new heart
                this.hearts.addFullHeart();
                // adds heart animation above puppy  head
                if (puppy.flipX){
                    this.bigheart.setPosition(puppy.x - 10, puppy.y - 45);
                } else {
                    this.bigheart.setPosition(puppy.x + 10, puppy.y - 45);
                }
                this.bigheart.setVisible(true);
                this.tweens.add({
                    targets: this.bigheart,
                    y: puppy.y - 55,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () =>{
                        console.log('big heart destroy');
                        this.bigheart.setVisible(false);
                    }
                })
            }
        })

    }
}