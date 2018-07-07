<template>
    <div>
        <div v-show="worlds.length">
            <p>
                Generation: {{generation}} | Max score: {{maxScore}}
            </p>
            <div class="world" :ref="'w'+i" :key="i" :id="'World '+i"
                 v-for="i in parseInt(amountWorlds)" v-if="!reset">
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
                worlds: [],
                worldsFinished: 0,
                neat: null,
                maxScore: 0,
                generation: 1,
                reset: false,
                amountWorlds: 0
            }
        },
        computed: {
            simulationSettings: sync('simulationSettings')
        },
        methods: {
            startSimulation() {
                this.amountWorlds = this.simulationSettings.amountWorlds
                this.neat = new window.neataptic.Neat(8, 4, null, {
                        popsize: this.simulationSettings.amountWorlds * this.simulationSettings.amountPredators,
                        elitism: this.simulationSettings.amountPredators / 100 * this.simulationSettings.elitism,
                        mutationRate: this.simulationSettings.mutationRate / 100,
                        network: new window.neataptic.architect.Random(
                            8,
                            Math.random() * 25,
                            4
                        )
                    }
                )
                this.$nextTick(() => {
                    this.generateWorlds()
                    this.seedWorlds()
                })
            },
            generateWorlds() {
                this.generation = 1
                if (this.worlds.length) {
                    this.worlds.forEach(world => {
                        world.stop()
                    })
                    this.worlds = []
                }
                for (let i = 1; i <= this.simulationSettings.amountWorlds; i++) {
                    this.worlds.push(new World(this.$refs['w' + i][0],
                        parseInt(this.simulationSettings.pixelHeight),
                        parseInt(this.simulationSettings.pixelWidth),
                        parseInt(this.simulationSettings.gridHeight),
                        parseInt(this.simulationSettings.gridWidth),
                        parseInt(this.simulationSettings.amountPredators),
                        parseInt(this.simulationSettings.amountPrey), () => this.endGeneration()))
                    this.worlds[i - 1].predators.forEach((predator, p) => {
                        predator.brain = this.neat.population[i * p - 1]
                    })
                }
            },
            seedWorlds() {
                this.worlds.forEach((world, index) => {
                    world.resetPrey()
                    world.resetPredators()
                    world.predators.forEach(predator => {
                        predator.brain = this.neat.population[index]
                        predator.energy = 100
                        predator.brain.score = 0
                    })
                })
                this.worlds.forEach(world => world.start())
            },
            endGeneration() {
                if (this.worldsFinished + 1 < this.worlds.length) {
                    this.worldsFinished++
                    return
                }
                this.worldsFinished = 0;

                this.neat.sort()

                this.maxScore = this.neat.popsize > 1 ? Math.max(this.maxScore, this.neat.getFittest().score) : this.neat.population[0].score

                const newGeneration = []

                for (let i = 0; i < this.neat.elitism; i++) {
                    newGeneration.push(this.neat.population[i])
                }

                for (let i = 0; i < this.neat.popsize - this.neat.elitism; i++) {
                    newGeneration.push(this.neat.getOffspring())
                }

                this.neat.population = newGeneration
                if (this.neat.popsize > 1) {
                    this.neat.mutate()
                }
                this.neat.generation++
                this.generation++
                this.seedWorlds()
            }
        },
        mounted() {
            window.eventBus.$on('start', () => this.startSimulation())
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
