let Entity = class Entity {
    constructor() {
        if (!window.ECS) window.ECS = {entities: {}, count: 0}
        if (!window.ECS.count) window.ECS.count = 0
        if (!window.ECS.entities) window.ECS.entities = {}

        this.id = window.ECS.count++
        this.components = {}
        window.ECS.entities[this.id] = this

        console.log(this.id,'created')
        return this
    }

    static create(...components) {
        let e = new Entity()
        components.forEach(c => {
            e.addComponent(c)
        })
        return e
    }

    // static delete(id) {
    //     if (!window.ECS || !window.ECS.entities) return
    //     delete window.ECS.entities[id]
    // }

    delete() {
        if (!window.ECS || !window.ECS.entities) return
        console.log(this.id,'deleted')
        delete window.ECS.entities[this.id]
    }

    addComponent(component) {
        if (component.name && window.ECS.components[component.name]) {
            this.components[component.name] = component
        } else {
            console.log('Component Error:', component)
        }
        return this
    }

    removeComponent(name) {
        delete this.components[name]
        return this
    }

    toJSON() {
        return JSON.stringify(this, null, 4)
    }

    static get(...components) {
        let result = []

        for (let key in window.ECS.entities) {
            let e = window.ECS.entities[key]
            if (e) {
                let valid = true
                components.forEach(c => {
                    if (valid) valid = !!e.components[c]
                })
                if (valid) result.push(e)
            }
        }

        return result

        // return window.ECS.entities.filter(e => {
        //     let valid = true
        //     components.forEach(c => {
        //         if (valid) valid = !!e.components[c.name]
        //     })
        //     return valid
        // })
    }
}

export default Entity