import soul = require("./typings/soul");
import blocks = require("./typings/blocks");
import charts = require("./typings/charts");
import exchange = require("./typings/exchange");
import soulsummoner = require("./typings/soulsummoner");
import seance = require("./typings/seance");
import maker = require("./typings/maker");
import timelock = require("./typings/timelock");
import lockup = require("./typings/lockup");
import utils = require("./typings/utils")

export = SoulData;
export as namespace SoulData;

declare namespace SoulData {

    export declare function timeseries({ blocks, timestamps, target }: {
        blocks?: number[];
        timestamps?: number[];
        target: Function;
    }, targetArguments?: any): Promise<any>;

    export { soul, blocks, charts, exchange, exchange_v1, soulsummoner, seance, maker, timelock, lockup, utils, funeralbox };
}
