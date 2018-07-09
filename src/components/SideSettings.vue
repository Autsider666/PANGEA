<template>
    <div class="side-window settings" ref="sideSettings"
         v-bind:style="{width: (sideSettings.show ? sideSettings.size : 0) + 'px'}">
        <span href="javascript:void(0)" class="node closebtn" @click="sideSettings.show = false">&times;</span>

        <!--<input type="submit" @click="eventBus.$emit('start')" :value="startButton">-->

        <button class="dropdown" @click="toggleDropdown('simulation')">
            Simulation Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='simulation'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'simulation' ? 'block':'none'}">
            <div class="slidecontainer">
                <label class="node" for="worlds">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">How many worlds do you want to simulate?</span>
                    </span>
                    Worlds: {{simulationSettings.amountWorlds}}
                </label>
                <input type="range" id="worlds" class="slider" min="1" max="250"
                       v-model="simulationSettings.amountWorlds">


                <label class="node" for="elitism">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">What portion of the fittest candidates do you want to take, unchanged, into the next generation?</span>
                    </span>
                    Elitism: {{simulationSettings.elitism}}%
                </label>
                <input type="range" id="elitism" class="slider" min="0" max="100" v-model="simulationSettings.elitism">

                <label class="node" for="mutation">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">How fast do you want your candidates to change each generation?</span>
                    </span>
                    Mutation Rate: {{simulationSettings.mutationRate}}%
                </label>
                <input type="range" id="mutation" class="slider" min="0" max="100"
                       v-model="simulationSettings.mutationRate">
            </div>
        </div>
        <button class="dropdown" @click="toggleDropdown('world')">
            World Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='world'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'world' ? 'block':'none'}">
            <div class="slidecontainer">
                <label class="node" for="pixelHeight">
                    World pixel height: {{simulationSettings.pixelHeight}} pixels
                </label>
                <input type="range" id="pixelHeight" class="slider" min="50" max="1000"
                       v-model="simulationSettings.pixelHeight">

                <label class="node" for="pixelWidth">
                    World pixel width: {{simulationSettings.pixelWidth}} pixels
                </label>
                <input type="range" id="pixelWidth" class="slider" min="50" max="1000"
                       v-model="simulationSettings.pixelWidth">

                <label class="node" for="GridHeight">
                    World grid height: {{simulationSettings.gridHeight}} squares
                </label>
                <input type="range" id="GridHeight" class="slider" min="25" max="500"
                       v-model="simulationSettings.gridHeight">

                <label class="node" for="gridWidth">
                    World grid width: {{simulationSettings.gridWidth}} squares
                </label>
                <input type="range" id="gridWidth" class="slider" min="25" max="500"
                       v-model="simulationSettings.gridWidth">
            </div>

            <!--<label class="node" for="pixelHeight">World pixel height?</label>-->
            <!--<input type="number" id="pixelHeight" min="1" v-model="simulationSettings.pixelHeight"><br>-->
            <!--<label class="node" for="pixelWidth">World pixel width?</label>-->
            <!--<input type="number" id="pixelWidth" min="1" v-model="simulationSettings.pixelWidth"><br>-->
            <!--<label class="node" for="GridHeight">World grid height?</label>-->
            <!--<input type="number" id="GridHeight" min="1" v-model="simulationSettings.gridHeight"><br>-->
            <!--<label class="node" for="gridWidth">World grid width?</label>-->
            <!--<input type="number" id="gridWidth" min="1" v-model="simulationSettings.gridWidth"><br>-->
        </div>
        <button class="dropdown" @click="toggleDropdown('predator')">
            Predator Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='predator'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'predator' ? 'block':'none'}">
            <label class="node" for="predator">Predators in each world?</label>
            <input type="number" id="predator" min="1" v-model="simulationSettings.amountPredators"><br>
        </div>
        <button class="dropdown" @click="toggleDropdown('prey')">
            Prey Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='prey'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'prey' ? 'block':'none'}">
            <label class="node" for="prey">Prey in each world?</label>
            <input type="number" id="prey" min="1" v-model="simulationSettings.amountPrey"><br>
            <label class="node" for="preyBrain">Should prey have a brain?</label>
            <input type="checkbox" id="preyBrain" min="1" v-model="simulationSettings.preyBrains">
        </div>
    </div>
</template>

<script>
    import {sync, set} from 'vuex-pathify';

    export default {
        data () {
            return {
                eventBus: window.eventBus,
                dropdown: 'simulation'
            }
        },
        computed: {
            simulationSettings: sync('simulationSettings'),
            simulation: sync('simulation'),
            sideSettings: sync('sideSettings'),
        },
        methods: {
            toggleDropdown(name) {
                if (this.dropdown === name) {
                    this.dropdown = 'none'
                } else {
                    this.dropdown = name
                }
            },
        },
    }
</script>

<style scoped lang="scss">

</style>
