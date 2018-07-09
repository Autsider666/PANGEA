<template>
    <div>
        <div class="remote-control" title="Start Simulation" @click="eventBus.$emit('start')"
             v-if="simulation.state === 'IDLE' || simulation.state === 'PAUSE'">
            <span class="node remote-button">
                <i class="fas fa-play"></i>
            </span>
        </div>
        <div class="remote-control" title="Pause Simulation" v-else="" @click="eventBus.$emit('pause')">
            <span class="node remote-button">
                <i class="fas fa-pause"></i>
            </span>
        </div>

        <div class="remote-control" @click="simulation.state !== 'IDLE' ? eventBus.$emit('restart'):null"
             v-bind:class="{'disabled':simulation.state === 'IDLE'}">
            <span class="node remote-button" title="Restart Simulation"
                  v-bind:class="{'disabled':simulation.state === 'IDLE'}">
                <i class="fas fa-undo"></i>
            </span>
        </div>

        <div class="remote-control" title="Show inactive worlds" v-if="simulationSettings.hideInactiveWorlds"
             @click="simulationSettings.hideInactiveWorlds = false">
            <span class="node remote-button">
                <i class="fas fa-eye"></i>
            </span>
        </div>

        <div class="remote-control" v-else=""
             @click="simulationSettings.hideInactiveWorlds = true" title="Hide inactive worlds">
            <span class="node remote-button">
                <i class="fas fa-eye-slash"></i>
            </span>
        </div>
    </div>
</template>

<script>
    import {sync} from 'vuex-pathify'
    export default {
        data () {
            return {
                eventBus: window.eventBus
            }
        },
        computed: {
            simulation: sync('simulation'),
            simulationSettings: sync('simulationSettings')
        }
    }
</script>

<style scoped>

</style>
