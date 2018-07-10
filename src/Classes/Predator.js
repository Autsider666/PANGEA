import Creature from "./Creature";
class Predator extends Creature {
    constructor(x, y, settings) {
        super(x, y, settings)
    }

    move(world) {
        if (this.energy <= 0) {
            return
        }
        this.energy--

        let targetsByDistance = []
        let oldDistance = 0;
        let closestPrey;
        if (world.prey.length) {
            targetsByDistance = world.prey
                .filter(p => {
                    return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2)) <= world.settings.predator.tracking.range && p.alive
                })
                .sort((a, b) => {
                    return Math.min(Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2)), Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2)));
                })
            if (targetsByDistance.length > world.settings.predator.tracking.capacity) {
                targetsByDistance = targetsByDistance.slice(0, world.settings.predator.tracking.capacity)
            } else if (targetsByDistance.length) {
                closestPrey = targetsByDistance[0]
            }
            while (targetsByDistance.length < world.settings.predator.tracking.capacity) {
                targetsByDistance.push(false)
            }
        }

        let alliesByDistance = []
        if (world.predators.length) {
            alliesByDistance = world.predators
                .filter(p => {
                    return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2)) <= world.settings.predator.communication.range && p.energy && p !== this
                })
                .sort((a, b) => {
                    return Math.min(Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2)), Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2)));
                })
            if (alliesByDistance.length > world.settings.predator.communication.capacity) {
                alliesByDistance = alliesByDistance.slice(0, world.settings.predator.communication.capacity)
            }
            while (alliesByDistance.length < world.settings.predator.communication.capacity) {
                alliesByDistance.push(false)
            }
        }

        if (closestPrey) {
            oldDistance = Math.sqrt(Math.pow(this.x - closestPrey.x, 2) + Math.pow(this.y - closestPrey.y, 2))
        }

        let moved = this.moveCreature(world.settings.world, targetsByDistance, alliesByDistance)


        if (closestPrey && moved) {
            let newDistance = Math.sqrt(Math.pow(this.x - closestPrey.x, 2) + Math.pow(this.y - closestPrey.y, 2))
            let delta = oldDistance - newDistance

            let amount = 5
            if (newDistance < amount) {
                this.brain.score += 0.1 * (amount - newDistance) / amount
            }
        }

        targetsByDistance.some((prey) => {
            if (prey.x === this.x && prey.y === this.y) {
                this.energy += prey.energy
                this.brain.score += 10
                prey.alive = false
                return true
            }
            return false
        })
    }
}
export default Predator
