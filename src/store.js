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
            size: 40,
        },
        simulationSettings: {
            amountWorlds: 5,
            amountPredators: 1,
            predatorBrains: true,
            amountPrey: 1,
            preyBrains: false,
            pixelHeight: 200,
            pixelWidth: 200,
            gridHeight: 50,
            gridWidth: 50,
            elitism: 0,
            mutationRate: 5,
        },
        simulation: {
            generation: 0,
            topPredatorScore: 0,
            topPreyScore: 0,
            worlds: [],
            predatorNeat: null,
            preyNeat: null,
            state: 'IDLE'
        }
    },
    mutations: {},
    actions: {}
})
