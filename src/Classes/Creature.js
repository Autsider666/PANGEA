export default class Creature {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    moveCreature(game, targets) {

        const input = [(targets[0].x - this.x) / game.gridWidth, (targets[0].y - this.y) / game.gridHeight]
        const output = this.brain.activate(input)

        let moved = false
        if (output[0] === Math.max(...output)) {
            if (this.y > 0) {
                this.y--
                moved = true
            }
        } else if (output[1] === Math.max(...output)) {
            if (this.y < game.gridHeight) {
                this.y++
                moved = true
            }
        } else if (output[2] === Math.max(...output)) {
            if (this.x > 0) {
                this.x--
                moved = true
            }
        } else if (output[3] === Math.max(...output)) {
            if (this.x < game.gridWidth) {
                this.x++
                moved = true
            }
        }
        return moved
    }
}
