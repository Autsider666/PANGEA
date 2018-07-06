<template>
    <div id="mySidenav" class="sidenav" ref="sidenav">
        <a href="javascript:void(0)" class="node closebtn" @click="eventBus.$emit('toggle')">&times;</a>
        <input type="submit" @click="" value="Start Simulation">
        <!--<label class="node" for="predator">Predators in each world?</label>-->
        <!--<input type="number" id="predator" min="1" v-model="asimulationSettings.mountPredators"><br>-->
        <!--<label class="node" for="prey">Prey in each world?</label>-->
        <!--<input type="number" id="prey" min="1" v-model="simulationSettings.amountPrey"><br>-->
        <!--<label class="node" for="pixelHeight">World pixel height?</label>-->
        <!--<input type="number" id="pixelHeight" min="1" v-model="psimulationSettings.ixelHeight"><br>-->
        <!--<label class="node" for="pixelWidth">World pixel width?</label>-->
        <!--<input type="number" id="pixelWidth" min="1" v-model="simulationSettings.pixelWidth"><br>-->
        <!--<label class="node" for="GridHeight">World grid height?</label>-->
        <!--<input type="number" id="GridHeight" min="1" v-model="simulationSettings.gridHeight"><br>-->
        <!--<label class="node" for="gridWidth">World grid width?</label>-->
        <!--<input type="number" id="gridWidth" min="1" v-model="simulationSettings.gridHeight"><br><br>-->
        <!--<input type="submit" @click="" value="Start Simulation">-->
        <button class="dropdown">
            Simulation Settings
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
            <label class="node" for="worlds">How many worlds?</label>
            <input type="number" id="worlds" min="1" v-model="simulationSettings.amountWorlds"><br>
            <label class="node" for="predator">Predators in each world?</label>
            <input type="number" id="predator" min="1" v-model="simulationSettings.amountPredators"><br>
            <label class="node" for="prey">Prey in each world?</label>
            <input type="number" id="prey" min="1" v-model="simulationSettings.amountPrey"><br>
            <label class="node" for="pixelHeight">World pixel height?</label>
            <input type="number" id="pixelHeight" min="1" v-model="simulationSettings.pixelHeight"><br>
            <label class="node" for="pixelWidth">World pixel width?</label>
            <input type="number" id="pixelWidth" min="1" v-model="simulationSettings.pixelWidth"><br>
            <label class="node" for="GridHeight">World grid height?</label>
            <input type="number" id="GridHeight" min="1" v-model="simulationSettings.gridHeight"><br>
            <label class="node" for="gridWidth">World grid width?</label>
            <input type="number" id="gridWidth" min="1" v-model="simulationSettings.gridHeight"><br><br>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                show: true,
                eventBus: window.eventBus,
                simulationSettings: {
                    amountWorlds: 5,
                    amountPredators: 1,
                    amountPrey: 1,
                    pixelHeight: 200,
                    pixelWidth: 200,
                    gridHeight: 50,
                    gridWidth: 50,
                }
            }
        },
        methods: {
            toggle(){
                if (this.show) {
                    this.$refs.sidenav.style.width = "0";
                } else {
                    this.$refs.sidenav.style.width = "350px";
                }
                this.show = !this.show
            }
        },
        mounted() {
            this.eventBus.$on('toggle', () => this.toggle())
        }
    }
</script>

<style scoped>
    /* The side navigation menu */
    .sidenav {
        height: 100%; /* 100% Full-height */
        width: 350px; /* 0 width - change this with JavaScript */
        position: fixed; /* Stay in place */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        left: 0;
        background-color: #111; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        padding-top: 60px; /* Place content 60px from the top */
        transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }

    /* The navigation menu links */
    .sidenav .node, .dropdown {
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
    .sidenav .node:hover {
        color: #f1f1f1;
    }

    /* Position and style the close button (top right corner) */
    .sidenav .closebtn {
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

    /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
        .sidenav {
            padding-top: 15px;
        }

        .sidenav .node {
            font-size: 18px;
        }
    }
</style>
