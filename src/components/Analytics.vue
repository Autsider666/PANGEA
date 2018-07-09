<template>
    <div class="analytics">
        <!--<h2>Analytics</h2>-->
        <canvas ref="chart"></canvas>
    </div>
</template>

<script>
    import {sync} from 'vuex-pathify'
    export default {
        data () {
            return {
                eventBus: window.eventBus,
                chart: null,
                chartData: null
            }
        },
        computed: {
            simulation: sync('simulation')
        },
        methods: {
            setup() {
                this.chart.data.labels = [0]
                this.chart.data.datasets = [
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
                this.chart.update()
            }
        },
        mounted(){
            this.chartData = {
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
            this.chart = new Chart(this.$refs.chart, {
                type: 'line',
                data: this.chartData,
                options: {
                    title: {
                        display: true,
                        text: 'Predator score history',
                    },
                    responsive: false,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    }
                }
            });

            window.eventBus.$on('start', () => {
                if (!this.chartData) {
                    this.setup()
                }
            })

            window.eventBus.$on('restart', () => {
                this.setup()
            })

            window.eventBus.$on('endGeneration', () => {
                this.chartData.labels.push(this.simulation.generation)
                this.chartData.datasets[0].data.push(this.simulation.predatorNeat.population[0].score.toFixed(2))
                this.chartData.datasets[1].data.push(this.simulation.predatorNeat.getAverage().toFixed(2))
                this.chartData.datasets[2].data.push(this.simulation.predatorNeat.population[this.simulation.predatorNeat.popsize - 1].score.toFixed(2))

                if (this.chartData.labels.length > 15) {
                    this.chartData.labels.shift()
                    this.chartData.datasets.forEach(d => d.data.shift())
                }

                this.chart.update()
            })
        }
    }
</script>

<style lang="scss" scoped>
    .analytics {
        display: inline-block;
        text-align: center;
        height: 220px;
    }

    canvas {
        background-color: $secondary-light;
        border: 2px groove $secondary-dark;
        padding: 5px;
        /*width: 400px;*/
        height: 270px;

    }

    h2 {
        margin: 10px 0;
    }
</style>
