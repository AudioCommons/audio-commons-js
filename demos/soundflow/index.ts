const MODULE_NAME: string = "soundflow-demo";

let configFile: any = require('./config/global');
let globalSet: any = configFile.globalSet;
console.log("[soundflow:index] globalSet.paths: %s", JSON.stringify(globalSet.paths));
let config = require('@colabo-utils/i-config');
config.init(globalSet);

import * as mediator from "@audio-commons/mediator-access";

const searchQuery = "bird";
mediator.init(function(){
    console.log("[%s] initialized", MODULE_NAME);
    console.log("[%s] searching for: %s", MODULE_NAME, searchQuery);
    mediator.search(searchQuery, function (results, response_id, collect_url){
        console.log("[%s] finished search for: %s", MODULE_NAME, searchQuery);
        console.log("[%s] collect_url: %s", MODULE_NAME, collect_url);
        console.log("[%s] response_id: %s", MODULE_NAME, response_id);
        console.log("[%s] results: %s", MODULE_NAME, JSON.stringify(results));
        let collectOptions = {
        };
        mediator.collectWait(response_id, collectOptions, function (result){
            console.log("[%s] collect result: %s", MODULE_NAME, JSON.stringify(result));
        });
    })
});
