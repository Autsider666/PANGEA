import Predator from './Predator.js'
import Prey from './Prey.js'
class World {
    constructor(element, pixelHeight, pixelWidth, gridHeight, gridWidth, predators, predatorHasBrain, prey, preyHasBrain, onEnd) {
        this.status = 'IDLE'
        this.pixelHeight = pixelHeight
        this.pixelWidth = pixelWidth
        this.gridHeight = gridHeight
        this.gridWidth = gridWidth
        this.maxPredators = predators
        this.maxPrey = prey
        this.onEnd = onEnd
        this.element = element

        this.predatorHasBrain = predatorHasBrain
        this.preyHasBrain = preyHasBrain

        this.creatureHeight = this.pixelHeight / this.gridHeight
        this.creatureWidth = this.pixelWidth / this.gridWidth

        this.spawnPredators()
        this.prey = []
        for (let i = 1; i <= prey; i++) {
            this.spawnPrey()
        }

        const P5 = require('p5')
        new P5(p => {
                p.setup = () => {
                    p.frameRate(60)
                    p.createCanvas(this.pixelWidth + this.pixelWidth / this.gridWidth + 4, this.pixelHeight + this.pixelHeight / this.gridHeight + 4)
                }

                p.drawPrey = () => {
                    p.fill('red')
                    this.prey.forEach(prey => {
                        if (prey.alive) {
                            p.ellipse(
                                (prey.x) * this.creatureWidth + 2,
                                (prey.y) * this.creatureHeight + 2,
                                this.creatureWidth,
                                this.creatureHeight,
                            )
                        }
                    })
                }

                p.drawPredator = () => {
                    p.fill('black')
                    this.predators.forEach(predator => {
                        p.rect(
                            (predator.x) * this.creatureWidth + 2,
                            (predator.y) * this.creatureHeight + 2,
                            this.creatureWidth,
                            this.creatureHeight,
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

                    if (this.status !== "PAUSE"){
                        if (this.predatorHasBrain) {
                            this.predators.forEach(predator => predator.move(this))
                        }

                        if (this.preyHasBrain) {
                            this.prey.forEach(prey => prey.move(this))
                        }

                        this.updateWorld()

                        p.background(255)

                        p.drawPredator()
                        p.drawPrey()
                        this.turns++
                    }
                }
            },
            element)
    }

    spawnPrey() {
        this.prey.push(new Prey(Math.floor(Math.random() * this.gridWidth) + 1, Math.floor(Math.random() * this.gridHeight) + 1))
    }

    spawnPredators() {
        this.predators = []
        for (let i = 1; i <= this.maxPredators; i++) {
            this.predators.push(new Predator(Math.floor(Math.random() * this.gridWidth) + 1, Math.floor(Math.random() * this.gridHeight) + 1))
        }
    }

    resetPrey() {
        this.prey = []
        for (let i = 1; i <= this.maxPrey; i++) {
            this.spawnPrey()
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
            this.prey.filter(prey => !prey.alive).forEach(prey => {
                prey.x = Math.floor(Math.random() * this.gridWidth) + 1
                prey.y = Math.floor(Math.random() * this.gridHeight) + 1
                prey.alive = true
            })
        }
    }

    start() {
        this.turns = 0
        this.status = 'RUNNING'
    }

    stop() {
        this.element.removeChild(this.element.childNodes[1]);
    }
}

export default World;
