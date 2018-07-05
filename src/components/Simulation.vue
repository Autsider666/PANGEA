<template>
    <div>
        <p v-if="!worlds.length">
            <label for="worlds">How many worlds?</label>
            <input type="number" id="worlds" min="1" v-model="amountWorlds"><br>
            <label for="predator">How many predators in each world?</label>
            <input type="number" id="predator" min="1" v-model="amountPredators"><br>
            <label for="prey">How many prey in each world?</label>
            <input type="number" id="prey" min="1" v-model="amountPrey"><br>
            <button @click="startSimulation">Start</button>
        </p>
        <div v-show="worlds.length">
            <p>
                Generation: {{generation}} | Max score: {{maxScore}}
            </p>
            <!--<world :ref="'w'+i" :fps="30" :key="i" :id="'World '+i" v-for="i in 10"></world>-->
            <div class="world" :ref="'w'+i" :key="i" :id="'World '+i" v-for="i in parseInt(amountWorlds)">
                <p>World {{i}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import world from '../components/World.vue'
    import World from '../Classes/World'
    export default {
        components: {
            world
        },
        props: {},
        data () {
            return {
                worlds: [],
                worldsFinished: 0,
                amountWorlds: 5,
                amountPredators: 1,
                amountPrey: 1,
                neat: null,
                maxScore: 0,
                generation: 1,
            }
        },
        methods: {
            startSimulation() {
                this.neat = new window.neataptic.Neat(8, 4, null, {
                        popsize: this.amountWorlds * this.amountPredators,
                        elitism: 5,
                        mutationRate: 0.5
                    }
                )
                this.generateWorlds()
                this.seedWorlds()
            },
            generateWorlds() {
                for (let i = 1; i <= this.amountWorlds; i++) {
                    this.worlds.push(new World(this.$refs['w' + i][0], 200, 50, this.amountPredators, this.amountPrey, () => this.endGeneration()))
                    this.worlds[i - 1].predators.forEach((predator, p) => {
                        predator.brain = this.neat.population[i * p - 1]
                    })
                }
            },
            seedWorlds() {
                this.worlds.forEach((world, index) => {
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

//                console.log('All worlds are finished')
//
//                console.log('Max score: ', (this.neat.popsize > 1 ? this.neat.getFittest() : this.neat.population[0]).score)

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

        }
    }
</script>

<style scoped>
    .world {
        display: inline-block;
        height: 275px;
        width: 250px;
        border: black dotted 1px;
        margin: 0 3px 3px 0;
    }
</style>
