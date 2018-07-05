<template>
    <div class="home">
        <h1>PANGEA</h1>
        <simulation></simulation>
    </div>
</template>

<script>
    import simulation from '../components/Simulation.vue'
    export default {
        name: 'home',
        components: {
            simulation
        }
    }
</script>
