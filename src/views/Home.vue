<template>
    <div class="home">
        <div class="top">
            <div class="main">
                <h1>PANGEA</h1>
                <remote-control></remote-control>

                <p v-show="!simulation.worlds.length">
                    Black Square = Predator <br>
                    Red dot = Prey
                </p>

                <p v-show="simulation.worlds.length">
                    <b>Generation:</b> {{simulation.generation}} <br>
                    <b>Top Predator score:</b> {{simulation.topPredatorScore}}
                </p>
            </div>
            <analytics></analytics>
        </div>
        <simulation></simulation>
    </div>
</template>

<script>
    import simulation from '../components/Simulation.vue'
    import remoteControl from '../components/RemoteControl.vue'
    import analytics from '../components/Analytics.vue'
    import {sync} from 'vuex-pathify'
    export default {
        components: {
            simulation,
            remoteControl,
            analytics,
        },
        computed: {
            simulation: sync('simulation')
        }
    }
</script>

<style>
    h1 {
        font-size: 60px;
        font-weight: bold;
        margin: 5px 0;
    }

    .top {
        height: 300px;
    }

    .main {
        text-align: center;
        min-width: 200px;
        width: 300px;
        display: inline-block;
        padding: 20px 20px;
    }
</style>
