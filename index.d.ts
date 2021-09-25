import soul = require("./typings/soul");
import blocks = require("./typings/blocks");
import charts = require("./typings/charts");
import exchange = require("./typings/exchange");
import summoner = require("./typings/summoner");
import reaper = require("./typings/reaper");
import utils = require("./typings/utils")
// import seance = require("./typings/seance");
// import timelock = require("./typings/timelock");
// import lockup = require("./typings/lockup");

export = SoulData;
export as namespace SoulData;

declare namespace SoulData {

    export declare function timeseries({ blocks, timestamps, target }: {
        blocks?: number[];
        timestamps?: number[];
        target: Function;
    }, targetArguments?: any): Promise<any>;

    export { soul, blocks, charts, exchanges, summoner, reapers, utils }; // TODO: seance
}
