export default class Creature {
    constructor(x, y, settings) {
        this.x = x
        this.y = y
        this.energy = settings.energy
    }

    moveCreature(world, targets, allies) {
        let input = []

        input.push(((world.grid.width / 2) - Math.abs(this.x - (world.grid.width / 2))) / world.grid.width)
        input.push(((world.grid.height / 2) - Math.abs(this.y - (world.grid.height / 2))) / world.grid.height)

        for (let i = 0; targets && i < targets.length; i++) {
            if (targets[i]) {
                input.push((targets[i].x - this.x) / world.grid.width)
                input.push((targets[i].y - this.y) / world.grid.height)
            } else {
                input.push(-1)
                input.push(-1)
            }
        }
        for (let i = 0; allies && i < allies.length; i++) {
            if (allies[i]) {
                input.push((allies[i].x - this.x) / world.grid.width)
                input.push((allies[i].y - this.y) / world.grid.height)
            } else {
                input.push(-1)
                input.push(-1)
            }
        }

        // const input = [(targets[0].x - this.x) / world.world.grid.width, (targets[0].y - this.y) / world.world.grid.height]
        const output = this.brain.activate(input)

        let moved = false
        if (output[0] === Math.max(...output)) {
            if (this.y > 0) {
                this.y--
                moved = true
            }
        } else if (output[1] === Math.max(...output)) {
            if (this.y < world.grid.height) {
                this.y++
                moved = true
            }
        } else if (output[2] === Math.max(...output)) {
            if (this.x > 0) {
                this.x--
                moved = true
            }
        } else if (output[3] === Math.max(...output)) {
            if (this.x < world.grid.width) {
                this.x++
                moved = true
            }
        }
        return moved
    }
}
