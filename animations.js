export const createAnimations = (game) => {
    game.mario.anims.create({
        key: "walk",
        frames: game.anims.generateFrameNumbers(
            "mario",
            {
                start: 1,
                end: 3,
            }
        ),
        frameRate: 10,
        repeat: -1,
    })

    game.anims.create({
        key: "jump",
        frames: game.anims.generateFrameNumbers(
            "mario",
            {
                start: 5,
                end: 5,
            }
        ),
        frameRate: 10,
        repeat: -1,
    })

    game.anims.create({
        key: "dead",
        frames: game.anims.generateFrameNumbers(
            "mario",
            {
                start: 4,
                end: 4,
            }
        ),
        frameRate: 10,
        repeat: -1,
    })
}