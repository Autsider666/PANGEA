<template>
    <div class="world" v-bind:style="{width:size + 'px',height:size + 'px',color:'red'}">
        {{id}}
        <predator v-for="p in predators" :key="'predator-'+p" :id="p" :ref="'predator-'+p" :data="world.predators[p]"
                  v-if="world.predators[p]" :events="events" @dead="finished"></predator>
        <prey v-for="p in prey" :key="'prey-'+p" :data="world.prey[p]" v-if="world.prey[p]"></prey>
    </div>
</template>

<script>
    import predator from '../components/Predator.vue'
    import prey from '../components/Prey.vue'
    import Vue from 'vue'
    export default {
        components: {
            predator,
            prey,
        },
        props: {
            id: {
//                type: Number,
                required: true,
            },
            size: {
                type: Number,
                default: 100
            },
            predators: {
                type: Number,
                default: 1,
            },
            prey: {
                type: Number,
                default: 1,
            },
            fps: {
                type: Number,
                default: 30,
            },
        },
        data () {
            return {
                events: new Vue(),
                world: {
                    predators: [],
                    prey: [],
                },
                population: null,
            }
        },
        methods: {
            finished(){
                eventBus.$emit('finished', this.id)
            },
            update(){
                console.log('Updating World ' + id)
                for (let p = 1; p <= this.predators; p++) {
                    this.events.$emit('predator-' + p, this.world)
                }
            },
            mounted() {

                for (let p = 1; p <= this.predators; p++) {
                    this.$set(this.world.predators, p, {
                        x: Math.floor(Math.random() * this.size) + 1,
                        y: Math.floor(Math.random() * this.size) + 1,
//                    brain:
                    })
                }
                for (let p = 1; p <= this.prey; p++) {
                    this.$set(this.world.prey, p, {
                        x: Math.floor(Math.random() * this.size) + 1,
                        y: Math.floor(Math.random() * this.size) + 1
                    })
                }
                window.eventBus.$on('update', () => {
                    console.log('updating')
                })
                this.finished()
            }
        }
    }
</script>

<style scoped>
    .world {
        display: inline-block;
    }
</style>
