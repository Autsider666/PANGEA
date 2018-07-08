<template>
    <div>
        <p v-show="!simulation.worlds.length">
            Black Square = Predator <br>
            Red dot = Prey
        </p>
        <div v-show="simulation.worlds.length">
            <p>
                Generation: {{simulation.generation}} | Top Predator score: {{simulation.topPredatorScore}}
            </p>
            <div class="world" :ref="'w'+i" :key="i" :id="'World '+i"
                 v-for="i in visualWorlds">
                <p>World {{i}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import World from '../Classes/World'
    import {sync} from 'vuex-pathify'
    export default {
        props: {},
        data () {
            return {
                worldsFinished: 0,
                visualWorlds: 0,
            }
        },
        computed: {
            simulationSettings: sync('simulationSettings'),
            simulation: sync('simulation'),
        },
        methods: {
            startSimulation() {
                this.simulation.topPredatorScore = 0
                this.simulation.topPreyScore = 0
                this.simulation.generation = 1

                this.simulation.worlds.forEach(world => {
                    world.stop()
                })

                this.simulation.worlds = []
                for (let i = 1; i <= this.simulationSettings.amountWorlds; i++) {
                    this.simulation.worlds.push(new World(this.$refs['w' + i][0],
                        parseInt(this.simulationSettings.pixelHeight),
                        parseInt(this.simulationSettings.pixelWidth),
                        parseInt(this.simulationSettings.gridHeight),
                        parseInt(this.simulationSettings.gridWidth),
                        parseInt(this.simulationSettings.amountPredators),
                        !!this.simulationSettings.predatorBrains,
                        parseInt(this.simulationSettings.amountPrey),
                        !!this.simulationSettings.preyBrains,
                        () => this.endGeneration()))
                }

                this.simulation.predatorNeat = new window.neataptic.Neat(8, 4, null, {
                        popsize: this.simulation.worlds.length * this.simulationSettings.amountPredators,
                        elitism: this.simulationSettings.amountPredators / 100 * this.simulationSettings.elitism,
                        mutationRate: this.simulationSettings.mutationRate / 100,
                        network: new window.neataptic.architect.Random(
                            8,
                            Math.random() * 25,
                            4
                        )
                    }
                )

                this.simulation.preyNeat = new window.neataptic.Neat(8, 4, null, {
                        popsize: this.simulation.worlds.length * this.simulationSettings.amountPrey,
                        elitism: this.simulationSettings.amountPrey / 100 * this.simulationSettings.elitism,
                        mutationRate: this.simulationSettings.mutationRate / 100,
                        network: new window.neataptic.architect.Random(
                            8,
                            Math.random() * 25,
                            4
                        )
                    }
                )
                this.seedWorlds()
            },
            seedWorlds() {
                this.simulation.worlds.forEach((world, w) => {
                    world.resetPrey()
                    world.prey.forEach(prey => {
                        prey.brain = this.simulation.preyNeat.population[w]
                        prey.energy = 100
                        prey.brain.score = 0
                    })
                    world.spawnPredators()
                    world.predators.forEach((predator, p) => {
                        let x = w * world.predators.length + p
                        predator.brain = this.simulation.predatorNeat.population[x]
                        predator.energy = 100
                        predator.brain.score = 0
                    })
                })
                this.simulation.worlds.forEach(world => world.start())
            },
            endGeneration() {
                if (this.worldsFinished + 1 < this.simulation.worlds.length) {
                    this.worldsFinished++
                    return
                }
                this.worldsFinished = 0;

//                this.simulation.worlds.forEach((world, w) => {
//                    world.predators.forEach((predator, p) => {
//                        let x = (w + 1) * (p + 1) - 1;
//                        this.simulation.predatorNeat.population[x].score = predator.brain.score + 1
//                    })
//                })

//                console.log([].concat.apply([], this.simulation.worlds.map(w => w.predators)).map(p => p.brain.score))
//                console.log(this.simulation.predatorNeat.population.map(p => p.score))

                this.simulation.predatorNeat.sort()

                window.eventBus.$emit('endGeneration')

                this.simulation.topPredatorScore = Math.max(this.simulation.topPredatorScore, ...this.simulation.predatorNeat.population.map(p => p.score)).toFixed(2)
                this.simulation.topPreyScore = Math.max(this.simulation.topPreyScore, ...this.simulation.preyNeat.population.map(p => p.score)).toFixed(2)

                this.breedNextGenerationOfPredators()
//                this.breedNextGenerationOfPrey()
                this.simulation.generation++
                this.seedWorlds()
            },
            breedNextGenerationOfPredators(){
                const newGeneration = []

                for (let i = 0; i < this.simulation.predatorNeat.elitism; i++) {
                    newGeneration.push(this.simulation.predatorNeat.population[i])
                }

                for (let i = 0; i < this.simulation.predatorNeat.popsize - this.simulation.predatorNeat.elitism; i++) {
                    newGeneration.push(this.simulation.predatorNeat.getOffspring())
                }

                this.simulation.predatorNeat.population = newGeneration
                if (this.simulation.predatorNeat.popsize > 1) {
                    this.simulation.predatorNeat.mutate()
                }
                this.simulation.predatorNeat.generation++
            },
            breedNextGenerationOfPrey(){
                const newGeneration = []

                for (let i = 0; i < this.simulation.preyNeat.elitism; i++) {
                    newGeneration.push(this.simulation.preyNeat.population[i])
                }

                for (let i = 0; i < this.simulation.preyNeat.popsize - this.simulation.preyNeat.elitism; i++) {
                    newGeneration.push(this.simulation.preyNeat.getOffspring())
                }

                this.simulation.preyNeat.population = newGeneration
                if (this.simulation.preyNeat.popsize > 1) {
                    this.simulation.preyNeat.mutate()
                }
                this.simulation.preyNeat.generation++
            },
        },
        mounted() {
            window.eventBus.$on('start', () => {
                if (!this.simulation.worlds.length) {
                    this.visualWorlds = parseInt(this.simulationSettings.amountWorlds)
                    this.$nextTick(() => this.startSimulation())
                } else {
                    this.simulation.worlds.forEach(w=>w.status = "RUNNING")
                }
                this.simulation.state = "RUNNING"
            })

            window.eventBus.$on('restart', () => {
                this.visualWorlds = parseInt(this.simulationSettings.amountWorlds)
                this.$nextTick(() => this.startSimulation())
                console.log('restarted')
                this.simulation.state = "RUNNING"
            })

            window.eventBus.$on('pause', () => {
                this.simulation.state = 'PAUSE'
                this.simulation.worlds.forEach(w=>w.status = "PAUSE")
            })
        }
    }
</script>

<style scoped>
    .world {
        display: inline-block;
        min-height: 275px;
        min-width: 250px;
        border: black dotted 1px;
        margin: 0 3px 3px 0;
        padding: 0 15px 15px 15px;
    }
</style>
