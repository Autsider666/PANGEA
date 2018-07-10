class Prey {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.alive = true
    }

    move(game) {
        let closestPredator = this
        if (game.predators.length) {
            closestPredator = game.predators.reduce(function (a, b) {
                return Math.min(Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2)), Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2)));
            });
        }

        // activate the neural network (aka "where the magic happens")

        const input = [(closestPredator.x - this.x)/game.gridWidth, (closestPredator.y - this.y)/game.gridHeight]
        const output = this.brain.activate(input)//.map(o => Math.round(o))

        let oldDistance = 0
        if (closestPredator) {
            oldDistance = Math.sqrt(Math.pow(this.x - closestPredator.x, 2) + Math.pow(this.y - closestPredator.y, 2))
        }
        let moved = false
        if (output[0] === Math.max(...output)) {
            // this.energy--
            if (this.y > 0) {
                this.y--
                moved = true
            }
        } else if (output[1] === Math.max(...output)) {
            // this.energy--
            if (this.y < game.gridHeight) {
                this.y++
                moved = true
            }
        } else if (output[2] === Math.max(...output)) {
            // this.energy--
            if (this.x > 0) {
                this.x--
                moved = true
            }
        } else if (output[3] === Math.max(...output)) {
            // this.energy--
            if (this.x < game.gridWidth) {
                this.x++
                moved = true
            }
        }

        if (closestPredator && moved) {
            let newDistance = Math.sqrt(Math.pow(this.x - closestPredator.x, 2) + Math.pow(this.y - closestPredator.y, 2))
            let delta = oldDistance - newDistance

            let amount = 10
            if (newDistance > amount) {
                this.brain.score += 0.1 * (newDistance - amount) / amount
            }
        }
    }
}
export default Prey
