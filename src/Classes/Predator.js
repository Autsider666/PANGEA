class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        // this.score = 0
        this.energy = 150
    }

    move(game) {
        if (this.energy <= 0) {
            // this.brain.score = 0;
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
        if (this.y + 1 <= game.unitsEachRow) {
            canMoveDown = 1
        }
        if (this.x - 1 >= 0) {
            canMoveLeft = 1
        }
        if (this.x + 1 <= game.unitsEachRow) {
            canMoveRight = 1
        }

        if (game.prey.length) {
            let closestPrey = game.prey.reduce(function (a, b) {
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

        const input = [canMoveUp, canMoveDown, canMoveLeft, canMoveRight, isPreyUp, isPreyDown, isPreyLeft, isPreyRight]
        const output = this.brain.activate(input)//.map(o => Math.round(o))

        // set the new direction
        if (output[0] > output[1]) {
            this.energy--
            if (this.y > 0) {
                this.y--
                if (isPreyUp) {
                    // this.brain.score += 1
                } else {
                    // this.brain.score -= 0.25
                }
            } else {
                // this.brain.score -= 0.5
            }
        } else if (output[0] < output[1]) {
            this.energy--
            if (this.y < game.unitsEachRow) {
                this.y++
                if (isPreyDown) {
                    // this.brain.score += 1
                } else {
                    // this.brain.score -= 0.25
                }
            } else {
                // this.brain.score -= 0.5
            }
        }

        if (output[2] > output[3]) {
            this.energy--
            if (this.x > 0) {
                this.x--
                if (isPreyLeft) {
                    // this.brain.score += 1
                } else {
                    // this.brain.score -= 0.25
                }
            } else {
                // this.brain.score -= 0.5
            }
        } else if (output[2] < output[3]) {
            this.energy--
            if (this.x < game.unitsEachRow) {
                this.x++
                if (isPreyRight) {
                    // this.brain.score += 1
                } else {
                    // this.brain.score -= 0.25
                }
            } else {
                // this.brain.score -= 0.5
            }
        }

        game.prey.forEach((prey, index) => {
            if (prey.x === this.x && prey.y === this.y) {
                this.energy += 80
                this.brain.score += 5
                game.prey.splice(index, 1)
                console.log('Njom')
            }
        })
    }
}
export default Predator
