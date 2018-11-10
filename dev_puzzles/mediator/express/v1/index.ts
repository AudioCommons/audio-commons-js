const MODULE_NAME: string = "@audio-commons/mediator-express";

declare var require: any;
declare var module: any;

import * as SearchSoundsAPI from './lib/search-sounds';

export function initialize(app) {
    console.log("[puzzle(knalledge/search) - /models/index.js] Registering KnAllEdge search API to: ", app);

    var searchNodes = app.resource('search-sounds', SearchSoundsAPI, { id: 'type?/:actionType?/:searchParam?/:searchParam2?' });
}