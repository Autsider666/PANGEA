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
            size: 300
        },
        sideStats: {
            show: false,
            size: 40,
        },
        simulationSettings: {
            predator: {
                amount: 1,
                hasBrain: true,
                energy: 100,
                communication: {
                    range: 25,
                    capacity: 5,
                },
                tracking: {
                    range: 50,
                    capacity: 5,
                },
                score: {
                    kill: 10,
                    distance: 10
                }
            },
            prey: {
                amount: 1,
                hasBrain: true,
                energy: 50,
                communication: {
                    range: 25,
                    capacity: 5,
                },
                tracking: {
                    range: 50,
                    capacity: 5,
                },
                score: {
                    kill: -1,
                    distance: -15
                }
            },
            world: {
                hideInactive: false,
                amount: 5,
                grid: {
                    height: 50,
                    width: 50,
                },
                size: {
                    height: 200,
                    width: 200,
                }
            },
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
