<template>
    <div class="sideStats" ref="sideStats" v-bind:style="{width: (sideStats.show ? sideStats.size: 0) + '%'}">
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
            <!--<input type="number" id="worlds" min="1" v-model="simulationSettings.amountWorlds"><br>-->
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
            startButton(){
                if (this.started) {
                    return "Restart Simulation"
                }
                return "Start Simulation"
            }
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

    canvas{
        width: 100%;
    }

    /* The side navigation menu */
    .sideStats {
        height: 100%; /* 100% Full-height */
        /*width: 350px; !* 0 width - change this with JavaScript *!*/
        position: fixed; /* Stay in place */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        right: 0;
        background-color: #111; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        padding-top: 60px; /* Place content 60px from the top */
        transition: 0.5s; /* 0.5 second transition effect to slide in the sideStats */
    }

    /* The navigation menu links */
    .sideStats .node, .dropdown {
        padding-top: 16px;
        padding-bottom: 8px;
        text-align: center;
        text-decoration: none;
        /*font-size: 15px;*/
        color: #b1b1b1;
        display: block;
        transition: 0.3s;
        border: none;
        background: none;
        width: 100%;
        cursor: pointer;
        outline: 0;
    }

    .dropdown {
        font-weight: bold;
        font-size: 20px;
    }

    /* When you mouse over the navigation links, change their color */
    .sideStats .node:hover {
        color: #f1f1f1;
    }

    /* Position and style the close button (top right corner) */
    .sideStats .closebtn {
        position: absolute;
        top: 0;
        left: 25px;
        font-size: 36px;
        margin-right: 50px;
        text-align: left;
        width: 25px;
        cursor: pointer;
    }

    label {
        min-width: 300px;
    }

    /* Style inputs with type="text", select elements and textareas */
    input[type=text], input[type=number], select, textarea {
        min-width: 250px; /* Full width */
        padding-left: 12px; /* Some padding */
        border: 1px solid #ccc; /* Gray border */
        border-radius: 4px; /* Rounded borders */
        box-sizing: border-box; /* Make sure that padding and width stays in place */
        /*margin-top: 6px; !* Add a top margin *!*/
        /*margin-bottom: 16px; !* Bottom margin *!*/
        resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
        /*font-size: 15px;*/
        height: 30px;
        background: lightgrey;
    }

    /* Style the submit button with a specific background color etc */
    input[type=submit] {
        background-color: grey;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    /* When moving the mouse over the submit button, add a darker green color */
    input[type=submit]:hover {
        background-color: dimgrey;
    }

    /* On smaller screens, where height is less than 450px, change the style of the sideStats (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
        .sideStats {
            padding-top: 15px;
        }

        .sideStats .node {
            font-size: 18px;
        }
    }
</style>
