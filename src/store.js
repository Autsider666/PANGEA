import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [pathify.plugin],
    state: {
        started: false,
        sideSettings: {
            show: true,
            size: 350
        },
        sideStats: {
            show: false,
            size: 350
        },
        simulationSettings: {
            amountWorlds: 5,
            amountPredators: 1,
            amountPrey: 1,
            pixelHeight: 200,
            pixelWidth: 200,
            gridHeight: 50,
            gridWidth: 50,
            elitism: 0,
            mutationRate: 5,
        }
    },
    mutations: {},
    actions: {}
})
