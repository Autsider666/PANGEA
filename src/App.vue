<template>
    <div id="app" ref="main"
         v-bind:style="{marginLeft: (sideSettings.show ? sideSettings.size : 0) + 'px',marginRight: (sideStats.show ? sideStats.size: 0) + 'px'}">
        <side-settings/>
        <span class="top-left" @click="sideSettings.show = true" style="font-size:30px;cursor:pointer">
            &#9776; Settings
        </span>
        <router-view/>
        <side-stats/>
        <span class="top-right" @click="sideStats.show = true" style="font-size:30px;cursor:pointer">
            Statistics &#9776;
        </span>
    </div>
</template>

<script>
    import SideSettings from './components/SideSettings.vue'
    import SideStats from './components/SideStats.vue'
    import {sync} from 'vuex-pathify'
    export default {
        components: {
            SideSettings,
            SideStats
        },
        computed: {
            sideStats: sync('sideStats'),
            sideSettings: sync('sideSettings'),
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-left: 350px;
        margin-right: 350px;
        transition: margin .5s;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .top-left {
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 6px;
    }

    .top-right {
        position: absolute;
        top: 0;
        right: 0;
        padding-right: 6px;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
