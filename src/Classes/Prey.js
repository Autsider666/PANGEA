import Creature from "./Creature";
class Prey extends Creature {
    constructor(x, y, settings) {
        super(x, y, settings)
        this.alive = true
    }

    move(world) {
        let targetsByDistance = []
        let oldDistance = 0;
        let closestPredator;

        if (world.predators.length) {
            targetsByDistance = world.predators
                .filter(p => {
                    return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2)) <= world.settings.prey.tracking.range
                })
                .sort((a, b) => {
                    return Math.min(Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2)), Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2)));
                })
            if (targetsByDistance.length > world.settings.prey.tracking.capacity) {
                targetsByDistance = targetsByDistance.slice(0, world.settings.prey.tracking.capacity)
            } else if (targetsByDistance.length) {
                closestPredator = targetsByDistance[0]
            }
            while (targetsByDistance.length < world.settings.prey.tracking.capacity) {
                targetsByDistance.push(false)
            }
        }

        let alliesByDistance = []
        if (world.prey.length) {
            alliesByDistance = world.prey
                .filter(p => {
                    return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2)) <= world.settings.prey.communication.range && p.alive && p !== this
                })
                .sort((a, b) => {
                    return Math.min(Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2)), Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2)));
                })
            if (alliesByDistance.length > world.settings.prey.communication.capacity) {
                alliesByDistance = alliesByDistance.slice(0, world.settings.prey.communication.capacity)
            }
            while (alliesByDistance.length < world.settings.prey.communication.capacity) {
                alliesByDistance.push(false)
            }
        }

        if (closestPredator) {
            oldDistance = Math.sqrt(Math.pow(this.x - closestPredator.x, 2) + Math.pow(this.y - closestPredator.y, 2))
        }

        let moved = this.moveCreature(world.settings.world, targetsByDistance, alliesByDistance)

        if (closestPredator && moved) {
            let newDistance = Math.sqrt(Math.pow(this.x - closestPredator.x, 2) + Math.pow(this.y - closestPredator.y, 2))
            let delta = oldDistance - newDistance

            let amount = 10
            if (newDistance > amount) {
                this.brain.score += 0.1 * (newDistance - amount) / amount
            }
        }
    }
}
export default Prey
