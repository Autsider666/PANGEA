<template>
    <div v-show="simulation.worlds.length">
        <div v-show="!simulationSettings.world.hideInactive || simulationSettings.world.hideInactive && simulation.worlds[i-1].status !== 'GAME_OVER'"
             class="world" :ref="'w'+i" :key="i" :id="'World '+i"
             v-for="i in visualWorlds">
            <p><b>World {{i}}</b></p>
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
                eventBus: window.eventBus
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
                for (let i = 1; i <= this.simulationSettings.world.amount; i++) {
                    this.simulation.worlds.push(new World(this.$refs['w' + i][0],
                        this.simulationSettings,
                        () => this.endGeneration()))
                }

                this.simulation.predatorNeat = new window.neataptic.Neat(8, 4, null, {
                        popsize: this.simulation.worlds.length * this.simulationSettings.predator.amount,
                        elitism: 0,//this.simulationSettings.predator.amount / 100 * this.simulationSettings.elitism,
                        mutationRate: this.simulationSettings.mutationRate / 100,
                        network: new window.neataptic.architect.Random(
                            2,
                            Math.random() * 25,
                            4
                        )
                    }
                )

                this.simulation.preyNeat = new window.neataptic.Neat(8, 4, null, {
                        popsize: this.simulation.worlds.length * this.simulationSettings.prey.amount,
                        elitism: 0, //this.simulationSettings.prey.amount / 100 * this.simulationSettings.elitism,
                        mutationRate: this.simulationSettings.mutationRate / 100,
                        network: new window.neataptic.architect.Random(
                            2,
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
                    world.prey.forEach((prey, p) => {
                        let x = w * world.prey.length + p
                        prey.brain = this.simulation.preyNeat.population[x]
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

//                console.log([].concat.apply([], this.simulation.worlds.map(w => w.predators)).map(p => p.brain.score))
//                console.log(this.simulation.predatorNeat.population.map(p

//                console.log([].concat.apply([], this.simulation.worlds.map(w => w.prey)).map(p => p.brain.score))
//                console.log(this.simulation.preyNeat.population.map(p => p.score))

                if (this.simulationSettings.predator.hasBrain) {
                    this.simulation.predatorNeat.sort()
                    this.simulation.topPredatorScore = Math.max(this.simulation.topPredatorScore, ...this.simulation.predatorNeat.population.map(p => p.score)).toFixed(2)
                }
                if (this.simulationSettings.prey.hasBrain) {
                    this.simulation.preyNeat.sort()
//                    console.log(this.simulation.topPreyScore, ...this.simulation.preyNeat.population.map(p => p.score))
                    this.simulation.topPreyScore = Math.max(this.simulation.topPreyScore, ...this.simulation.preyNeat.population.map(p => p.score)).toFixed(2)
                }

                window.eventBus.$emit('endGeneration')

                if (this.simulationSettings.predator.hasBrain) {
                    this.breedNextGenerationOfPredators()
                }
                if (this.simulationSettings.prey.hasBrain) {
                    this.breedNextGenerationOfPrey()
                }

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
                    this.visualWorlds = parseInt(this.simulationSettings.world.amount)
                    this.$nextTick(() => this.startSimulation())
                } else {
                    this.simulation.worlds.forEach(w => w.status = "RUNNING")
                }
                this.simulation.state = "RUNNING"
            })

            window.eventBus.$on('restart', () => {
                this.visualWorlds = 0
                this.$nextTick(() => {
                    this.visualWorlds = parseInt(this.simulationSettings.world.amount)
                    this.$nextTick(() => {
                        this.startSimulation()
                    })
                })
                this.simulation.state = "RUNNING"
            })

            window.eventBus.$on('pause', () => {
                this.simulation.state = 'PAUSE'
                this.simulation.worlds.forEach(w => w.status = "PAUSE")
            })
        }
    }
</script>

<style scoped>
    .world {
        text-align: center;
    }

    .world p {
        margin: 5px 0;
        font-size: 20px;
    }
</style>
