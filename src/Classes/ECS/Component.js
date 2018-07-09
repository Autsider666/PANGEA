export default class Component {
    constructor(name, ...data) {
        if (!window.ECS || !window.ECS.components || !window.ECS.components[name]) {
            console.log(name + ' not found')
        }
        this.name = name
        if (data && typeof window.ECS.components[name] === "function") this.data = window.ECS.components[name](...data)
    }

    static extend(name, callback) {
        if (!window.ECS || !window.ECS.components) window.ECS = {components: {}}
        window.ECS.components[name] = callback || -1
    }
}
