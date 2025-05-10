import { createAnimations } from "./animations.js"

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

    this.load.audio(
        "music",
        "assets/sound/music/overworld/theme.mp3"
    )

    this.load.audio(
        "gameover",
        "assets/sound/music/gameover.mp3"
    )

    this.load.audio(
        "jump",
        "assets/sound/effects/jump.mp3"
    )
}

function create() {

    this.sound.play("music", {
        loop: true,
        volume: 0.5,
    })

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

    createAnimations(this)

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

    if(this.mario.isDead){
        return
    }

    if(this.keys.right.isDown) {
        this.mario.x += 2.5
        this.mario.setFlipX(this.keys.left.isDown)
        if(this.mario.body.touching.down){
            this.mario.anims.play("walk", true)
        }
    }else if(this.keys.left.isDown) {
        this.mario.x -= 2.5
        this.mario.setFlipX(this.keys.left.isDown)
        if(this.mario.body.touching.down){
            this.mario.anims.play("walk", true)
        }
    } else{
        this.mario.anims.stop()
        this.mario.setFrame(0)
    }

    if(this.keys.up.isDown) {
        this.mario.anims.play("jump", true)
        this.sound.play("jump")
        if(this.mario.body.touching.down){
            this.mario.setVelocityY(-600)
        }
    }

    if(this.mario.y >= 480){
        this.mario.isDead = true
        this.mario.anims.play("dead", true)
        this.mario.setCollideWorldBounds(false)
        this.sound.play("gameover")
        //this.sound.pause("music")

        setTimeout(() => {
            this.mario.setVelocityY(-700)
        }, 100)
        
        setTimeout(() => {
            this.scene.restart()
            this.sound.stopAll()
        }, 3000)
    }
}