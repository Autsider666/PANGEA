class Prey {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 150
        this.alive = true
    }

    move(game) {
        if (this.energy <= 0) {
            return
        }
        let canMoveUp = 0
        let canMoveDown = 0
        let canMoveLeft = 0
        let canMoveRight = 0
        let isPredatorUp = 0
        let isPredatorDown = 0
        let isPredatorLeft = 0
        let isPredatorRight = 0

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

        let closestPredator = null
        if (game.predators.length) {
            closestPredator = game.predators.reduce(function (a, b) {
                return Math.min(Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2)), Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2)));
            });

            if (this.y < closestPredator.y) {
                isPredatorUp = 1
            }
            if (this.y > closestPredator.y) {
                isPredatorDown = 1
            }
            if (this.x < closestPredator.x) {
                isPredatorLeft = 1
            }
            if (this.x > closestPredator.x) {
                isPredatorRight = 1
            }
        }

        // activate the neural network (aka "where the magic happens")

        const input = [canMoveUp, canMoveDown, canMoveLeft, canMoveRight, isPredatorUp, isPredatorDown, isPredatorLeft, isPredatorRight]
        const output = this.brain.activate(input)//.map(o => Math.round(o))

        let oldDistance = 0
        if (closestPredator) {
            oldDistance = Math.sqrt(Math.pow(this.x - closestPredator.x, 2) + Math.pow(this.y - closestPredator.y, 2))
        }
        let moved = false
        // set the new direction
        if (output[0] === Math.max(...output)) {
            this.energy--
            if (this.y > 0) {
                this.y--
                moved = true
                if (isPredatorUp) {
                    // this.brain.score += 1
                } else {
                    // this.brain.score -= 0.25
                }
            } else {
                // this.brain.score -= 0.5
            }
        } else if (output[1] === Math.max(...output)) {
            this.energy--
            if (this.y < game.gridHeight) {
                this.y++
                moved = true
                if (isPredatorDown) {
                    // this.brain.score += 1
                } else {
                    // this.brain.score -= 0.25
                }
            } else {
                // this.brain.score -= 0.5
            }
        } else if (output[2] === Math.max(...output)) {
            this.energy--
            if (this.x > 0) {
                this.x--
                moved = true
                if (isPredatorLeft) {
                    // this.brain.score += 1
                } else {
                    // this.brain.score -= 0.25
                }
            } else {
                // this.brain.score -= 0.5
            }
        } else if (output[3] === Math.max(...output)) {
            this.energy--
            if (this.x < game.gridWidth) {
                this.x++
                moved = true
                if (isPredatorRight) {
                    // this.brain.score += 1
                } else {
                    // this.brain.score -= 0.25
                }
            } else {
                // this.brain.score -= 0.5
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
