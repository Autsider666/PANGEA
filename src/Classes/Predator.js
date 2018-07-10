import Creature from "./Creature";
class Predator extends Creature {
    constructor(x, y) {
        super(x, y)
        this.energy = 100
    }

    move(game) {
        if (this.energy <= 0) {
            return
        }
        this.energy--

        let targetsByDistance = []
        let oldDistance = 0;
        if (game.prey.length) {
            targetsByDistance = game.prey.sort(function (a, b) {
                return Math.min(Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2)), Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2)));
            });
            oldDistance = Math.sqrt(Math.pow(this.x - targetsByDistance[0].x, 2) + Math.pow(this.y - targetsByDistance[0].y, 2))
        }

        let moved = this.moveCreature(game, targetsByDistance)

        let closestPrey = targetsByDistance[0]

        if (closestPrey !== this && moved) {
            let newDistance = Math.sqrt(Math.pow(this.x - closestPrey.x, 2) + Math.pow(this.y - closestPrey.y, 2))
            let delta = oldDistance - newDistance

            let amount = 5
            if (newDistance < amount) {
                this.brain.score += 0.1 * (amount - newDistance) / amount
            }
        }

        targetsByDistance.some((prey, index) => {
            if (prey.x === this.x && prey.y === this.y) {
                this.energy = Math.min(100, this.energy + 50)
                this.brain.score += 10
                prey.alive = false
                return true
            }
            return false
        })
    }
}
export default Predator
