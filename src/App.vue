<template>
    <div id="app" ref="main">
        <side-form/>
        <span class="top-left" @click="eventBus.$emit('toggle')" style="font-size:30px;cursor:pointer">
            &#9776; open form
        </span>
        <router-view/>
    </div>
</template>

<script>
    import SideForm from './components/SideForm.vue'
    export default {
        components: {
            SideForm
        },
        data () {
            return {
                show: true,
                eventBus: window.eventBus,
            }
        },
        methods: {
            toggle(){
                if (this.show) {
                    this.$refs.main.style.marginLeft = "0";
                } else {
                    this.$refs.main.style.marginLeft = "350px";
                }
                this.show = !this.show
            }
        },
        mounted() {
            this.eventBus.$on('toggle', () => {
                this.toggle()
            })
        }
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
        transition: margin-left .5s;
        padding: 20px;
    }

    .top-left {
        position: absolute;
        top: 0;
        left: 0;
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
