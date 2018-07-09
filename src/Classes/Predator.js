class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 150
    }

    move(game) {
        if (this.energy <= 0) {
            return
        }
        let canMoveUp = 0
        let canMoveDown = 0
        let canMoveLeft = 0
        let canMoveRight = 0
        let isPreyUp = 0
        let isPreyDown = 0
        let isPreyLeft = 0
        let isPreyRight = 0

        if (this.y - 1 >= 0) {
            canMoveUp = 1
        }
        if (this.y + 1 <= game.gridHeight) {
            canMoveDown = 1
        }
        if (this.x - 1 >= 0) {
            canMoveLeft = 1
        }
        if (this.x + 1 <= game.gridWidth) {
            canMoveRight = 1
        }

        let closestPrey = this
        if (game.prey.length) {
            closestPrey = game.prey.reduce(function (a, b) {
                return Math.min(Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2)), Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2)));
            });

            if (this.y < closestPrey.y) {
                isPreyUp = 1
            }
            if (this.y > closestPrey.y) {
                isPreyDown = 1
            }
            if (this.x < closestPrey.x) {
                isPreyLeft = 1
            }
            if (this.x > closestPrey.x) {
                isPreyRight = 1
            }
        }

        // activate the neural network (aka "where the magic happens")

        // const input = [canMoveUp, canMoveDown, canMoveLeft, canMoveRight, isPreyUp, isPreyDown, isPreyLeft, isPreyRight]
        const input = [(closestPrey.x - this.x)/game.gridWidth, (closestPrey.y - this.y)/game.gridHeight]
        const output = this.brain.activate(input)

        let oldDistance = 0
        if (closestPrey) {
            oldDistance = Math.sqrt(Math.pow(this.x - closestPrey.x, 2) + Math.pow(this.y - closestPrey.y, 2))
        }
        let moved = false
        if (output[0] === Math.max(...output)) {
            this.energy--
            if (this.y > 0) {
                this.y--
                moved = true
            }
        } else if (output[1] === Math.max(...output)) {
            this.energy--
            if (this.y < game.gridHeight) {
                this.y++
                moved = true
            }
        } else if (output[2] === Math.max(...output)) {
            this.energy--
            if (this.x > 0) {
                this.x--
                moved = true
            }
        } else if (output[3] === Math.max(...output)) {
            this.energy--
            if (this.x < game.gridWidth) {
                this.x++
                moved = true
            }
        }

        if (closestPrey !== this && moved) {
            let newDistance = Math.sqrt(Math.pow(this.x - closestPrey.x, 2) + Math.pow(this.y - closestPrey.y, 2))
            let delta = oldDistance - newDistance

            let amount = 5
            if (newDistance < amount) {
                this.brain.score += 0.1 * (amount - newDistance) / amount
            }
        }

        game.prey.forEach((prey, index) => {
            if (prey.x === this.x && prey.y === this.y) {
                this.energy = Math.min(100, this.energy + 50)
                this.brain.score += 10
                prey.alive = false
            }
        })
    }
}
export default Predator
