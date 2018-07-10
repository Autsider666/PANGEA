import Predator from './Predator.js'
import Prey from './Prey.js'
import ROT from 'rot-js'
class World {
    constructor(element, initialSettings, onEnd) {
        this.status = 'IDLE'
        this.settings = JSON.parse(JSON.stringify(initialSettings))
        this.creatureHeight = this.settings.world.size.height / this.settings.world.grid.height
        this.creatureWidth = this.settings.world.size.width / this.settings.world.grid.width
        this.onEnd = onEnd
        this.element = element

        this.map = []
        // this.open

        this.debug = true

        this.mapType = false//'dungeon'

        this.spawnPredators()
        this.prey = []
        for (let i = 1; i <= this.settings.prey.amount; i++) {
            this.spawnPrey()
        }

        const P5 = require('p5')
        new P5(p => {
                let bg;
                p.setup = () => {
                    p.frameRate(999)
                    p.createCanvas(this.settings.world.size.width + this.settings.world.size.width / this.settings.world.grid.width + 2, this.settings.world.size.height + this.settings.world.size.height / this.settings.world.grid.height + 2)
                    bg = p.createGraphics(this.settings.world.size.width + this.settings.world.size.width / this.settings.world.grid.width, this.settings.world.size.height + this.settings.world.size.height / this.settings.world.grid.height)
                    this.generateMap(bg)
                }

                p.drawPrey = () => {
                    p.fill('red')
                    this.prey.forEach(prey => {
                        if (prey.alive) {
                            p.ellipse(
                                (prey.x) * this.creatureWidth + 1 + this.creatureWidth / 2,
                                (prey.y) * this.creatureHeight + 1 + this.creatureHeight / 2,
                                this.creatureWidth,
                                this.creatureHeight,
                            )
                        }
                    })
                }

                p.drawPredator = () => {
                    p.fill('black')
                    this.predators.forEach(predator => {
                        if (predator.energy) {
                            p.rect(
                                (predator.x) * this.creatureWidth + 1,
                                (predator.y) * this.creatureHeight + 1,
                                this.creatureWidth,
                                this.creatureHeight,
                            )
                        }
                    })
                }

                p.draw = () => {
                    if (['IDLE', 'GAME_OVER'].indexOf(this.status) !== -1) {
                        p.background('#EEE')
                        p.fill(0)
                        p.textSize(15)
                        if (this.status === "GAME_OVER") {
                            let max = this.predators.map(p => p.brain.score.toFixed(2)).reduce(function (a, b) {
                                return Math.max(a, b);
                            });
                            if (max) {
                                p.text(max.toString() + ' Points', 5, 20)
                            }
                        }
                        return
                    }

                    if (this.status !== "PAUSE") {
                        p.background(255)
                        p.image(bg, 0, 0)
                        p.fill(255)
                        if (this.debug) p.text("FPS: " + p.frameRate().toFixed(0), 5, 20)
                        p.noStroke();
                        if (this.settings.predator.hasBrain) {
                            this.predators.forEach(predator => predator.move(this))
                        }

                        if (this.settings.prey.hasBrain) {
                            this.prey.forEach(prey => prey.move(this))
                        }

                        this.updateWorld()
                        p.drawPrey()
                        p.drawPredator()
                        this.turns++
                    }
                }
            },
            element)
    }

    generateMap(bg) {
        if (this.mapType === 'dungeon') {
            let digger = new ROT.Map.Digger(this.settings.world.grid.width, this.settings.world.grid.height, {dugPercentage: 0.5});

            let digCallback = function (x, y, value) {
                let z = x * this.settings.world.grid.width + y
                this.map[z] = !value;
            }
            digger.create(digCallback.bind(this));
        }

        if (this.mapType) {
            bg.noStroke()
            bg.background(0)
            for (let x = 0; x <= this.settings.world.grid.width; x++) {
                for (let y = 0; y <= this.settings.world.grid.height; y++) {
                    let z = x * this.settings.world.grid.width + y
                    if (this.map[z]) {
                        bg.fill(255)
                        bg.rect(
                            (x) * this.creatureWidth,
                            (y) * this.creatureHeight,
                            this.creatureWidth,
                            this.creatureHeight,
                        )
                    }
                }
            }
        }


    }

    spawnPrey() {
        this.prey.push(new Prey(Math.floor(Math.random() * this.settings.world.grid.width) + 1, Math.floor(Math.random() * this.settings.world.grid.height) + 1, this.settings.prey))
    }

    spawnPredators() {
        this.predators = []
        for (let i = 1; i <= this.settings.predator.amount; i++) {
            this.predators.push(new Predator(Math.floor(Math.random() * this.settings.world.grid.width) + 1, Math.floor(Math.random() * this.settings.world.grid.height) + 1, this.settings.predator))
        }
    }

    resetPrey() {
        this.prey = []
        for (let i = 1; i <= this.settings.prey.amount; i++) {
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
                prey.x = Math.floor(Math.random() * this.settings.world.grid.width) + 1
                prey.y = Math.floor(Math.random() * this.settings.world.grid.height) + 1
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
