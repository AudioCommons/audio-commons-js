"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MODULE_NAME = "@audio-commons/mediator-express";
const SearchSoundsAPI = require("./lib/search-sounds");

function initialize(app) {
    console.log("[puzzle(knalledge/search) - /models/index.js] Registering KnAllEdge search API to: ", app);
    var searchNodes = app.resource('search-sounds', SearchSoundsAPI, { id: 'type?/:actionType?/:searchParam?/:searchParam2?' });
}
exports.initialize = initialize;
//# sourceMappingURL=index.js.map