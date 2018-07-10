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
                    Worlds: {{simulationSettings.world.amount}}
                </label>
                <input type="range" id="worlds" class="slider" min="1" max="250"
                       v-model.number="simulationSettings.world.amount">


                <label class="node" for="elitism">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">What portion of the fittest candidates do you want to take, unchanged, into the next generation?</span>
                    </span>
                    Elitism: {{simulationSettings.elitism}}%
                </label>
                <input type="range" id="elitism" class="slider" min="0" max="100" step="5"
                       v-model.number="simulationSettings.elitism">

                <label class="node" for="mutation">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">How fast do you want your candidates to change each generation?</span>
                    </span>
                    Mutation Rate: {{simulationSettings.mutationRate}}%
                </label>
                <input type="range" id="mutation" class="slider" min="0" max="100" step="5"
                       v-model.number="simulationSettings.mutationRate">
            </div>
        </div>
        <button class="dropdown" @click="toggleDropdown('world')">
            World Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='world'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'world' ? 'block':'none'}">
            <div class="slidecontainer">
                <label class="node" for="world.size.height">
                    World pixel height: {{simulationSettings.world.size.height}} pixels
                </label>
                <input type="range" id="world.size.height" class="slider" min="50" max="1000" step="25"
                       v-model.number="simulationSettings.world.size.height">

                <label class="node" for="world.size.width">
                    World pixel width: {{simulationSettings.world.size.width}} pixels
                </label>
                <input type="range" id="world.size.width" class="slider" min="50" max="1000" step="25"
                       v-model.number="simulationSettings.world.size.width">

                <label class="node" for="world.grid.height">
                    World grid height: {{simulationSettings.world.grid.height}} squares
                </label>
                <input type="range" id="world.grid.height" class="slider" min="25" max="500" step="5"
                       v-model.number="simulationSettings.world.grid.height">

                <label class="node" for="world.grid.width">
                    World grid width: {{simulationSettings.world.grid.width}} squares
                </label>
                <input type="range" id="world.grid.width" class="slider" min="25" max="500" step="5"
                       v-model.number="simulationSettings.world.grid.width">
            </div>
        </div>
        <button class="dropdown" @click="toggleDropdown('predator')">
            Predator Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='predator'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'predator' ? 'block':'none'}">
            <div class="slidecontainer">
                <!--Predator amount-->
                <label class="node"
                       for="predator">Predators in each world: {{simulationSettings.predator.amount}}</label>
                <input type="range" id="predator" class="slider" min="1" max="100"
                       v-model.number="simulationSettings.predator.amount">

                <!--Predator brain-->
                <label class="node" for="predatorBrain">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">Do you want predators to be static or powered by an evolving "brain"?</span>
                    </span>
                    Evolving predators?
                    <div class="checkbox">
                        <input type="checkbox" v-model="simulationSettings.predator.hasBrain" id="predatorBrain"
                               name="check"/>
                        <label for="predatorBrain"></label>
                    </div>
                </label>

                <div>
                    <!--Predator energy-->
                    <label class="node" for="predator.energy">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">What should the energy reserve of a predator be? Each tick takes 1 energy.</span>
                    </span>
                        Starting energy of a predator: {{simulationSettings.predator.energy}}
                    </label>
                    <input type="range" id="predator.energy" class="slider" min="50" max="500" step="10"
                           v-model.number="simulationSettings.predator.energy">

                    <!--Predator communication range-->
                    <label class="node" for="predator.communication.range">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">What is the communication range with other nearby predators?</span>
                    </span>
                        Communication range: {{simulationSettings.predator.communication.range}} squares
                    </label>
                    <input type="range" id="predator.communication.range" class="slider" min="0" max="250" step="1"
                           v-model.number="simulationSettings.predator.communication.range">

                    <!--Predator communication capacity-->
                    <label class="node" for="predator.communication.capacity">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">How many allies (in range) should a predator take into account?</span>
                    </span>
                        Communication capacity: {{simulationSettings.predator.communication.capacity}}
                    </label>
                    <input type="range" id="predator.communication.capacity" class="slider" min="0" max="25" step="1"
                           v-model.number="simulationSettings.predator.communication.capacity">

                    <!--Predator tracking range-->
                    <label class="node" for="predator.tracking.range">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">What is the tracking range of each predator?</span>
                    </span>
                        Tracking range: {{simulationSettings.predator.tracking.range}} squares
                    </label>
                    <input type="range" id="predator.tracking.range" class="slider" min="0" max="250" step="1"
                           v-model.number="simulationSettings.predator.tracking.range">

                    <!--Predator tracking capacity-->
                    <label class="node" for="predator.tracking.capacity">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">How many prey (in range) should a predator take into account?</span>
                    </span>
                        Tracking capacity: {{simulationSettings.predator.tracking.capacity}}
                    </label>
                    <input type="range" id="predator.tracking.capacity" class="slider" min="0" max="25" step="1"
                           v-model.number="simulationSettings.predator.tracking.capacity">
                </div>
            </div>
        </div>
        <button class="dropdown" @click="toggleDropdown('prey')">
            Prey Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='prey'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'prey' ? 'block':'none'}">
            <div class="slidecontainer">
                <label class="node" for="prey">Prey in each world: {{simulationSettings.prey.amount}}</label>
                <input type="range" id="prey" class="slider" min="1" max="100"
                       v-model.number="simulationSettings.prey.amount">

                <label class="node" for="prey.energy">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">How much energy will a predator get when eating prey?</span>
                    </span>
                    Energetic worth of prey: {{simulationSettings.prey.energy}}
                </label>
                <input type="range" id="prey.energy" class="slider" min="50" max="500" step="10"
                       v-model.number="simulationSettings.prey.energy">
                <label class="node" for="preyBrain">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">Do you want prey to be static or powered by an evolving "brain"?</span>
                    </span>
                    Evolving prey?
                    <div class="checkbox">
                        <input type="checkbox" v-model="simulationSettings.prey.hasBrain" id="preyBrain" name="check"/>
                        <label for="preyBrain"></label>
                    </div>
                </label>

                <div>
                    <!--Prey communication range-->
                    <label class="node" for="prey.communication.range">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">What is the communication range with other nearby prey?</span>
                    </span>
                        Communication range: {{simulationSettings.prey.communication.range}} squares
                    </label>
                    <input type="range" id="prey.communication.range" class="slider" min="0" max="250" step="1"
                           v-model.number="simulationSettings.prey.communication.range">

                    <!--Prey communication capacity-->
                    <label class="node" for="prey.communication.capacity">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">How many allies (in range) should a prey take into account?</span>
                    </span>
                        Communication capacity: {{simulationSettings.prey.communication.capacity}}
                    </label>
                    <input type="range" id="prey.communication.capacity" class="slider" min="0" max="25" step="1"
                           v-model.number="simulationSettings.prey.communication.capacity">

                    <!--Prey tracking range-->
                    <label class="node" for="prey.tracking.range">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">What is the tracking range of each prey?</span>
                    </span>
                        Tracking range: {{simulationSettings.prey.tracking.range}} squares
                    </label>
                    <input type="range" id="prey.tracking.range" class="slider" min="0" max="250" step="1"
                           v-model.number="simulationSettings.prey.tracking.range">

                    <!--Prey tracking capacity-->
                    <label class="node" for="prey.tracking.capacity">
                    <span class="tooltip"><i class="fas fa-info-circle"></i>
                        <span class="tooltiptext">How many prey (in range) should a prey take into account?</span>
                    </span>
                        Tracking capacity: {{simulationSettings.prey.tracking.capacity}}
                    </label>
                    <input type="range" id="prey.tracking.capacity" class="slider" min="0" max="25" step="1"
                           v-model.number="simulationSettings.prey.tracking.capacity">
                </div>
            </div>
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
