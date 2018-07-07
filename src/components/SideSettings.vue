<template>
    <div class="sideSettings" ref="sideSettings"
         v-bind:style="{width: (sideSettings.show ? sideSettings.size : 0) + 'px'}">
        <a href="javascript:void(0)" class="node closebtn" @click="sideSettings.show = false">&times;</a>
        <input type="submit" @click="eventBus.$emit('start')" :value="startButton">
        <button class="dropdown" @click="toggleDropdown('simulation')">
            Simulation Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='simulation'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'simulation' ? 'block':'none'}">
            <label class="node" for="worlds">How many worlds?</label>
            <input type="number" id="worlds" min="1" v-model="simulationSettings.amountWorlds"><br>
            <label class="node" for="elitism">Elitism Percentage?</label>
            <input type="number" id="elitism" min="10" max="100" v-model="simulationSettings.elitism"><br>
            <label class="node" for="mutation">Mutation Rate Percentage?</label>
            <input type="number" id="mutation" min="5" max="100" v-model="simulationSettings.mutationRate"><br>
        </div>
        <button class="dropdown" @click="toggleDropdown('world')">
            World Settings
            <i class="fa fa-caret-down" v-if="dropdown!=='world'"></i>
            <i class="fa fa-caret-left" v-else=""></i>
        </button>
        <div class="dropdown-container" v-bind:style="{display:dropdown === 'world' ? 'block':'none'}">
            <label class="node" for="pixelHeight">World pixel height?</label>
            <input type="number" id="pixelHeight" min="1" v-model="simulationSettings.pixelHeight"><br>
            <label class="node" for="pixelWidth">World pixel width?</label>
            <input type="number" id="pixelWidth" min="1" v-model="simulationSettings.pixelWidth"><br>
            <label class="node" for="GridHeight">World grid height?</label>
            <input type="number" id="GridHeight" min="1" v-model="simulationSettings.gridHeight"><br>
            <label class="node" for="gridWidth">World grid width?</label>
            <input type="number" id="gridWidth" min="1" v-model="simulationSettings.gridWidth"><br>
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
            started: sync('started'),
            sideSettings: sync('sideSettings'),
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
        },
    }
</script>

<style scoped>
    /* The side navigation menu */
    .sideSettings {
        height: 100%; /* 100% Full-height */
        /*width: 350px; !* 0 width - change this with JavaScript *!*/
        position: fixed; /* Stay in place */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        left: 0;
        background-color: #111; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        padding-top: 60px; /* Place content 60px from the top */
        transition: 0.5s; /* 0.5 second transition effect to slide in the sideSettings */
    }

    /* The navigation menu links */
    .sideSettings .node, .dropdown {
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
    }

    .dropdown {
        font-weight: bold;
        font-size: 20px;
    }

    /* When you mouse over the navigation links, change their color */
    .sideSettings .node:hover {
        color: #f1f1f1;
    }

    /* Position and style the close button (top right corner) */
    .sideSettings .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
        text-align: right;
    }

    label {
        min-width: 300px;
    }

    /* Style inputs with type="text", select elements and textareas */
    input[type=text], input[type=number], select, textarea {
        min-width: 250px; /* Full width */
        padding: 12px; /* Some padding */
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

    /* On smaller screens, where height is less than 450px, change the style of the sideSettings (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
        .sideSettings {
            padding-top: 15px;
        }

        .sideSettings .node {
            font-size: 18px;
        }
    }
</style>
