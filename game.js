class GameplayScreen extends Phaser.Scene {
    constructor() {
        super('gameplayscreen');
    }

    preload() {
        this.load.image('snail', 'assets/snails.png');
        this.load.image('rolypoly', 'assets/RolyPoly.png');

    }
    create() {
        // player
        this.player = this.physics.add.sprite(400,900,'rolypoly').setScale(.4);
        // snail
        this.snail1 = this.physics.add.sprite(2170,900,'snail').setScale(0.3,0.3);
        this.snail2 = this.physics.add.sprite(2170,900,'snail').setScale(0.3,0.3);
        // this.snail2.body.setOffset(-20, 0);

        this.add.text(600,100,"Jump the Snails!").setFontSize(80);
       
        // this.snail1.body.gravity.y = 0;
        // this.snail2.body.gravity.y = 0;
        this.player.setCollideWorldBounds(true);
        this.snail1.setCollideWorldBounds(true);
        this.snail2.setCollideWorldBounds(true);
        
        // check if player on ground
        this.physics.add.collider(this.player, this.snail1, () => {
            this.add.text(500,500,"YOU LOST!").setFontSize(80);
           this.player.setVelocityX(-800);
           this.time.addEvent({
            delay: 4000, 
            callback: () => { this.scene.restart(); }, 
            callbackScope: this,
        });
        });
        this.physics.add.collider(this.player, this.snail2, () => {
            this.add.text(500,500,"YOU LOST!").setFontSize(80);
            this.player.setVelocityX(-800);
            this.time.addEvent({
                delay: 4000, 
                callback: () => { this.scene.restart(); }, 
                callbackScope: this,
            });
         });

        // get arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();


    }

    update() {
        
        // movement for player
        if (this.cursors.up.isDown && (this.player.y >= 900) ) {
                this.player.setVelocityY(-800);
                // this.player.body.gravity.y = -2;
            }
        
        if (this.cursors.right.isDown) {
            this.player.x += 10;
        }
        if (this.cursors.left.isDown) {
            this.player.x -= 10;
        }
        if (this.player.x > 1600) {
            this.add.text(500,500,"YOU WON!").setFontSize(80);
            this.time.addEvent({
                delay: 4000, 
                callback: () => { this.scene.restart(); }, 
                callbackScope: this,
            });
            
        }

        if (this.snail1.x <= 180) {
            this.snail1.destroy();
        }
          if (this.snail2.x <= 180) {
            this.snail2.destroy();
          }
        
        
        // movement of snail
        this.snail1.x -= 3;

        // start second snail after the first one is half way through the screen
        if (this.snail1.x <= 900) {
            this.snail2.x -= 3;
        }
    }
}


let config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1000 },
          debug: true,
        },
      },
    backgroundColor: 0x000000,
    scene: [GameplayScreen],
}
let game = new Phaser.Game(config);