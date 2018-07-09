export default class System {
    constructor(...componentTypes) {
        this.__components = []
        componentTypes.forEach(type => {
            if (window.ECS && window.ECS.components && window.ECS.components[type]) {
                this.__components.push(type)
            }
        })
    }

    entities() {
        return window.ECS.entities.filter(e => {
            let valid = true
            this.__components.forEach(c => {
                if (valid) valid = e.components.includes(c.name)
            })
            return valid
        })
    }
}
