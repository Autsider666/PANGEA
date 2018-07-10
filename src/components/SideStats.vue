<template>
    <div class="side-window stats" ref="sideStats" v-bind:style="{width: (sideStats.show ? sideStats.size: 0) + '%'}">
        <span class="node closebtn" @click="sideStats.show = false">&times;</span>
        <button class="dropdown" @click="toggleDropdown('simulation')">
            Predator Statistics
            <i class="fa fa-caret-down" v-if="dropdown!=='simulation'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'simulation' ? 'block':'none'}">
            <!--Coming Soon!-->
            <canvas ref="predatorScore" style="background-color: lightgrey"></canvas>
            <!--<label class="node" for="worlds">How many worlds?</label>-->
            <!--<input type="number" id="worlds" min="1" v-model="simulationSettings.world.amount"><br>-->
            <!--<label class="node" for="elitism">Elitism Percentage?</label>-->
            <!--<input type="number" id="elitism" min="10" max="100" v-model="simulationSettings.elitism"><br>-->
            <!--<label class="node" for="mutation">Mutation Rate Percentage?</label>-->
            <!--<input type="number" id="mutation" min="5" max="100" v-model="simulationSettings.mutationRate"><br>-->
        </div>
    </div>
</template>

<script>
    import {sync} from 'vuex-pathify';
    import Chart from 'chart.js';

    export default {
        data () {
            return {
                eventBus: window.eventBus,
                dropdown: 'simulation',
                chart: null,
                predatorScoreData: null
            }
        },
        computed: {
            simulationSettings: sync('simulationSettings'),
            started: sync('started'),
            sideStats: sync('sideStats'),
            simulation: sync('simulation'),
        },
        methods: {
            toggleDropdown(name) {
                if (this.dropdown === name) {
                    this.dropdown = 'none'
                } else {
                    this.dropdown = name
                }
            },
            setup() {
                this.predatorScoreData = {
                    labels: [0],
                    datasets: [
                        {
                            label: 'Top score',
                            data: [0]
                        },
                        {
                            label: 'Average score',
                            data: [0]
                        },
                        {
                            label: 'Lowest Score',
                            data: [0]
                        }
                    ]
                }

                this.chart = new Chart(this.$refs.predatorScore, {
                    title: 'Predator score history',
                    type: 'line',
                    height: 200,
                    data: this.predatorScoreData
                });
            }
        },
        mounted() {
            window.eventBus.$on('start', () => {
                if (!this.predatorScoreData) {
                    this.setup()
                }
            })

            window.eventBus.$on('restart', () => {
                this.setup()
            })

            window.eventBus.$on('endGeneration', () => {
                this.predatorScoreData.labels.push(this.simulation.generation)
                this.predatorScoreData.datasets[0].data.push(this.simulation.predatorNeat.population[0].score.toFixed(2))
                this.predatorScoreData.datasets[1].data.push(this.simulation.predatorNeat.getAverage().toFixed(2))
                this.predatorScoreData.datasets[2].data.push(this.simulation.predatorNeat.population[this.simulation.predatorNeat.popsize - 1].score.toFixed(2))

                if (this.predatorScoreData.labels.length > 15) {
                    this.predatorScoreData.labels.shift()
                    this.predatorScoreData.datasets.forEach(d => d.data.shift())
                }

                this.chart.update()
            })
        }
    }
</script>

<style scoped>

</style>
