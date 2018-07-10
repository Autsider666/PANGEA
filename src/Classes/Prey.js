import Creature from "./Creature";
class Prey extends Creature {
    constructor(x, y) {
        super(x, y)
        this.alive = true
    }

    move(game) {
        let targetsByDistance = []
        let oldDistance = 0;
        if (game.predators.length) {
            targetsByDistance = game.predators.sort(function (a, b) {
                return Math.min(Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2)), Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2)));
            });
                oldDistance = Math.sqrt(Math.pow(this.x - targetsByDistance[0].x, 2) + Math.pow(this.y - targetsByDistance[0].y, 2))
        }

        let moved = this.moveCreature(game, targetsByDistance)

        let closestPredator = targetsByDistance[0]

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
