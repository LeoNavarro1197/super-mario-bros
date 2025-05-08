const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    backgroundColor: '#049cd8',
    parent: 'super-mario',
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 300,
            },
            debug: false,
        },
    },
    scene: {
        preload, //precarga recursos
        create, //crear el juego
        update, //actualizar el juego
    }
}

new Phaser.Game(config)

function preload() {
    this.load.spritesheet(
        "mario",
        "assets/entities/mario.png",
        {
            frameWidth: 18,
            frameHeight: 16,
        }
    )

    this.load.image(
        "cloud1",
        "assets/scenery/overworld/cloud1.png"
    )

    this.load.image(
        "floorbricks",
        "assets/scenery/overworld/floorbricks.png"
    )
}

function create() {
    /*this.mario = this.add.sprite(
        250,
        420,
        "mario"
    )
    .setScale(1.8)*/

    this.mario = this.physics.add.sprite(
        250,
        220,
        "mario"
    )
    .setScale(1.8)
    .setGravityY(1000)
    .setCollideWorldBounds(true)

    this.mario.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers(
            "mario",
            {
                start: 1,
                end: 3,
            }
        ),
        frameRate: 10,
        repeat: -1,
    })

    this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers(
            "mario",
            {
                start: 5,
                end: 5,
            }
        ),
        frameRate: 10,
        repeat: -1,
    })

    this.add.image(
        250,
        150,
        "cloud1"
    )
    .setScale(.3)

    this.floor = this.physics.add.staticGroup()
    
    this.floor.create(
        0,
        450,
        "floorbricks"
    )
    .setScale(1.8)
    .setOrigin(0, 0)
    .refreshBody()

    this.floor.create(
        230,
        450,
        "floorbricks"
    )
    .setScale(1.8)
    .setOrigin(0, 0)
    .refreshBody()

    /*this.add.tileSprite(
        0,
        440,
        config.width,
        50,
        "floorbricks"
    )
   .setScale(1.8)
   .setOrigin(0, 0)*/

    this.physics.world.setBounds(0, 0, 1000, config.height)
    this.cameras.main.setBounds(0, 0, 1000, config.height)
    this.cameras.main.startFollow(this.mario)

    this.physics.add.collider(
        this.mario,
        this.floor
    )

   this.keys = this.input.keyboard.createCursorKeys()
}

function update() {
    if(this.keys.right.isDown) {
        this.mario.x += 2.5
        this.mario.anims.play("walk", true)
        this.mario.setFlipX(this.keys.left.isDown)
    }else if(this.keys.left.isDown) {
        this.mario.x -= 2.5
        this.mario.anims.play("walk", true)
        this.mario.setFlipX(this.keys.left.isDown)
    } else{
        this.mario.anims.stop()
        this.mario.setFrame(0)
    }

    if(this.keys.up.isDown) {
        this.mario.anims.play("jump", true)
        if(this.mario.body.touching.down){
            this.mario.setVelocityY(-600)
        }
    }
}