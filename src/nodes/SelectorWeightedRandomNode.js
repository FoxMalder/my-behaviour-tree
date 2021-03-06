import c from './constants';
import chooseByRandom from './Utils';

/**
 * Example:
 * [
 * [0.7 Lazy around]
 * [0.2 Pretend to work]
 * [0.1 Actually work]
 * ]
 */
export default class SelectorWeightedRandomNode {

    constructor(weightsActionMap) {
        this.weightsActionMap = weightsActionMap;
    }

    execute (BTInstance) {
        var state = BTInstance.findStateForNode(this);
        if (state == c.RUNNING)
            return;
        var action = chooseByRandom(this.weightsActionMap);
        //console.debug("randomIndex", this.weightsActionMap, action);
        BTInstance.setState(c.WAITING, this);
        for (var j = 0; j < this.weightsActionMap.length; j++) {
            if (this.weightsActionMap[j][1] == action)
                BTInstance.setState(c.TO_BE_STARTED, action);
            else
                BTInstance.setState(c.DISCARDED, this.weightsActionMap[j][1]);
        }
    }

    children () {
        var actionArray = [];
        for (var j = 0; j < this.weightsActionMap.length; j++) {
            actionArray.push(this.weightsActionMap[j][1]);
        }
        return actionArray;
    }

    isConditional () {
        return false;
    };
}
