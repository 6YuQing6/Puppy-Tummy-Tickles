class Cloud extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y){
    super(scene, x, y, 'cloud');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

  }
}