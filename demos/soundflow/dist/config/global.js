'use strict';
// this is file is available to the rest of the system
// through the puzzle `@colabo-utils/i-config`
// please read `@colabo-utils/i-config/README.md` for more details
// NOTE: it is important that this file is not imported, but required
// and that it is therefore JS (not TS, although it can be, if we still do not import it)
// because otherwise it would be bundled in a final file during building
// and we wouldn't be able to change the config after building project
console.log("[config/global.js] Setting up the globalSet variable");
let globalSet = {};
if (typeof window !== 'undefined' && typeof window !== 'null') {
    if (!window.hasOwnProperty('globalSet'))
        window.globalSet = {};
    globalSet = window.globalSet;
}
if (typeof global !== 'undefined' && typeof global !== 'null') {
    if (!global.hasOwnProperty('globalSet'))
        global.globalSet = {};
    globalSet = global.globalSet;
}
console.log("Setting up the global variable");
if (!globalSet.hasOwnProperty('general')) {
    console.log("[config/global.js] Setting up globalSet.general");
    globalSet.general = {};
}
var path = require('path');
// expose this function to our app using module.exports
if (!globalSet.hasOwnProperty('paths')) {
    console.log("Setting up globalSet.paths");
    globalSet.paths = {};
    globalSet.paths.DATASET_FOLDER = path.resolve(globalSet.paths.EXPERIMENTS_FOLDER + "/data");
    globalSet.paths.FOLDER_OUT = path.resolve(globalSet.paths.DATASET_FOLDER + "/out");
    globalSet.paths.FOLDER_CACHE = path.resolve(globalSet.paths.EXPERIMENTS_FOLDER + "/cache");
}
if (!globalSet.hasOwnProperty('puzzles')) {
    console.log("Setting up globalSet.puzzles");
    globalSet.puzzles = {
        '@audio-commons/mediator-access': {
            client_id: 'kWisHB1KxJFWuT92ayozRhGe1WC3UKbLtIQo0vnK',
            username: 'mprinc',
            password: 'kanalizacija'
        }
    };
}
console.log("[config/global.js] globalSet.puzzles:", globalSet.puzzles);
// node support (export)
if (typeof module !== 'undefined') {
    // workarround for TypeScript's `module.exports` readonly
    if ('exports' in module) {
        if (typeof module['exports'] !== 'undefined') {
            module['exports'].globalSet = globalSet;
        }
    }
    else {
        module['exports'] = globalSet;
    }
}
console.log("[config/global.js] finished");
//# sourceMappingURL=global.js.map