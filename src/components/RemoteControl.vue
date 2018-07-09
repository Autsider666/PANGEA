<template>
    <div class="remote-control">
        <span class="node remote-button" title="Start Simulation" v-if="simulation.state === 'IDLE' || simulation.state === 'PAUSE'"
              @click="eventBus.$emit('start')">
            <i class="fas fa-play"></i>
        </span>
        <span class="node remote-button" title="Pause Simulation" v-else="" @click="eventBus.$emit('pause')">
            <i class="fas fa-pause"></i>
        </span>

        <span class="node remote-button" title="Restart Simulation">
            <i v-bind:class="{'disabled':simulation.state === 'IDLE'}"
               @click="simulation.state !== 'IDLE' ? eventBus.$emit('restart'):null" class="fas fa-undo"></i>
        </span>

        <span class="node remote-button" title="Show inactive worlds" v-if="simulationSettings.hideInactiveWorlds"
              @click="simulationSettings.hideInactiveWorlds = false">
            <i class="fas fa-eye"></i>
        </span>
        <span class="node remote-button" title="Hide inactive worlds" v-else="" @click="simulationSettings.hideInactiveWorlds = true">
            <i class="fas fa-eye-slash"></i>
        </span>
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
