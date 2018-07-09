import Component from './ECS/Component'

Component.extend('renderable', type => type)

Component.extend('brain', brain => brain)

Component.extend('location', (x, y, world) => {
    return {x: x, y: y, world: world}
})

Component.extend('size', (height, width) => {
    return {height: height, width: width}
})

Component.extend('grid', (height, width) => {
    return {height: height, width: width}
})

Component.extend('energy', amount => amount)

Component.extend('predator')
Component.extend('prey')
Component.extend('world', name => name)

Component.extend('element', element => element)