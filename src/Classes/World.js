import Predator from './Predator.js'
class World {
    constructor(element, size, unitsEachRow, predators, prey, onEnd) {
        this.status = 'IDLE'
        this.size = size
        this.unitsEachRow = unitsEachRow
        this.maxPredators = predators
        this.resetPredators()

        this.prey = []
        this.maxPrey = prey
        for (let i = 1; i <= prey; i++) {
            this.spawnPrey()
        }
        this.onEnd = onEnd

        this.creatureSize = this.size / this.unitsEachRow
        const P5 = require('p5')
        new P5(p => {
                p.setup = () => {
                    p.frameRate(60)
                    p.createCanvas(this.size + this.size / this.unitsEachRow, this.size + this.size / this.unitsEachRow)
                }

                p.drawPrey = () => {
                    p.fill('red')
                    this.prey.forEach(prey => {
                        p.rect(
                            (prey.x) * this.creatureSize,
                            (prey.y) * this.creatureSize,
                            this.creatureSize,
                            this.creatureSize,
                        )
                    })
                }

                p.drawPredator = () => {
                    p.fill('black')
                    this.predators.forEach(predator => {
                        p.rect(
                            (predator.x) * this.creatureSize,
                            (predator.y) * this.creatureSize,
                            this.creatureSize,
                            this.creatureSize,
                        )
                    })
                }

                p.draw = () => {
                    if (['IDLE', 'GAME_OVER'].indexOf(this.status) !== -1) {
                        p.background('#EEE')
                        p.fill(0)
                        p.textSize(15)
                        if (this.status === "GAME_OVER") {
                            let max = this.predators.map(p => p.brain.score).reduce(function (a, b) {
                                return Math.max(a, b);
                            });
                            if (max) {
                                p.text(max.toString() + ' Points', 5, 20)
                            }
                        }
                        return
                    }

                    this.predators.forEach(predator => {
                        predator.move(this)
                    })

                    this.updateWorld()

                    p.background(255)

                    p.drawPredator()
                    p.drawPrey()
                    this.turns++
                }
            },
            element)
    }

    spawnPrey() {
        this.prey.push({
            x: Math.floor(Math.random() * this.unitsEachRow) + 1,
            y: Math.floor(Math.random() * this.unitsEachRow) + 1,
        })
    }

    resetPredators() {
        this.predators = []
        for (let i = 1; i <= this.maxPredators; i++) {
            this.predators.push(new Predator(Math.floor(Math.random() * this.unitsEachRow) + 1, Math.floor(Math.random() * this.unitsEachRow) + 1))
        }
    }

    updateWorld() {
        if (this.predators.filter(p => p.energy).length === 0 || this.predators.map(p => p.brain.score).reduce(function (a, b) {
                return Math.max(a, b);
            }) <= -50
        ) {
            this.status = 'GAME_OVER'
            this.onEnd()
        } else {
            while (this.prey.length < this.maxPrey) {
                this.spawnPrey()
            }
        }
    }

    start() {
        this.turns = 0
        this.status = 'RUNNING'
    }
}

export default World;
