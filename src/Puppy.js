class Puppy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'puppy');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(this.width/5, this.height/10);
        this.body.setOffset(15,35);
        this.setCollideWorldBounds(true);
        this.layDownTime = 3000;
        this.moving = false;
        this.moveTime = 250;
        this.moveToX = 100;

        scene.puppyFSM = new StateMachine('walk', {
            stand: new StandState(),
            walk: new WalkState(),
            layDown: new LayDownState()
            }, [scene, this]);
    }
    happyPet(){
        this.play('puppy_happy');
    }
    idle(){
        this.play('puppy_stand');
    }
    moveTo(x){
        if (!(x + 5 > this.x && this.x > x - 5)){
            if (this.x < x && !this.moving){
                this.x += 5;
                this.flipX = false;
                this.moving = true;
                this.scene.time.delayedCall(this.moveTime, () => {
                    this.moving = false;
                });
            } else if (this.x > x && !this.moving){
                this.x -= 5;
                this.flipX = true;
                this.moving = true;
                this.scene.time.delayedCall(this.moveTime, () => {
                    this.moving = false;
                });
            }
        } else{
            return true;
        }
    }
    // timer for when it lays down
    // distance formula or physics boxes for calculating perfect, good, failed tickle
    // tweens for ai movement
}

class StandState extends State {
    enter(scene, puppy){
        puppy.idle();
        this.stateMachine.transition('walk');
        return;
    }
}

class WalkState extends State {
    enter(scene, puppy){
        puppy.idle();
        console.log('walking')
        puppy.moveToX = Phaser.Math.Between(20,160);
        console.log(puppy.moveToX);
    }
    execute(scene, puppy){
        if (puppy.moveTo(puppy.moveToX)){
            this.stateMachine.transition('layDown');
            return;
        }
    }
}

class LayDownState extends State {
    enter(scene, puppy){
        puppy.play('puppy_layDown');
        scene.time.delayedCall(puppy.layDownTime, () => {
            this.stateMachine.transition('stand');
            return;
        })
    }
}