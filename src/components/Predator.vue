<template>
    <div>
        Predator
        {{data}}
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true,
            },
            events: {
                type: Object,
                required: true,
            },
            id: {
                type: Number,
                required: true
            }
        },
        data () {
            return {}
        },
        methods: {
            update(world){
                console.log('updating predator')
            }
        },
        mounted() {
            this.events.$on('predator-' + this.id, (world) => {
//                console.log('predator-' + this.id, world)
            })
        }
    }
</script>

<style scoped>

</style>
