class Hand extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'hand');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(this.width / 8, this.height / 3);
        this.body.setOffset(29,30);
        //this.setCollideWorldBounds(true);

        this.moving = false;
        this.moveLength = 5;

        scene.handFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            drop: new DropState()
            }, [scene, this])
    }
    // tween for moving down to tickle
    // collision box for calculating tickle?
    // movement controls - cursors / space
}
class IdleState extends State {
    execute(scene, hand){
        const {left, right, down} = scene.keys
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move');
            return;
        } else if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('drop');
            return
        }
    }
}
// https://stackoverflow.com/questions/54066012/how-to-make-a-sprite-with-fixed-movement-distance-in-phaser
class MoveState extends State {
    execute(scene, hand){
        const {left, right, down} = scene.keys
        if(left.isDown && !hand.moving && hand.x > 0) {
            hand.x -= hand.moveLength;
            hand.moving = true;
            scene.time.delayedCall(80, () => {
                hand.moving = false;
                //console.log(hand.x) 
            });
        }
        if (right.isDown && !hand.moving && hand.x < 160) {
            hand.x += hand.moveLength;
            hand.moving = true;
            scene.time.delayedCall(80, () => {
                hand.moving = false;
                //console.log(hand.x)
            });
        } 
        if (Phaser.Input.Keyboard.JustDown(down) && !hand.moving) {
            this.stateMachine.transition('drop');
            return
        }
    }
}

class DropState extends State {
    enter(scene, hand){
        scene.tweens.add({
            targets: hand,
            y: 95,
            duration: 500,
            ease: 'Linear',
            onComplete: () => {
                scene.time.delayedCall(500, () => {
                    scene.tweens.add({
                        targets: hand,
                        y: 50,
                        duration: 300,
                        ease: 'Linear',
                        onComplete: () => {
                            console.log('returning');
                            this.stateMachine.transition('idle');
                            return;
                        }
                    })
                })
            }
        })
    }
}