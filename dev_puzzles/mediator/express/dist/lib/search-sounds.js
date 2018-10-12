"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MODULE_NAME = "@audio-commons/mediator-express/search-sounds";
var accessId = 0;
const access_1 = require("@audio-commons/mediator-access");
// TODO: here we need to wait for finish
// and support renewing token
access_1.init(function() {
    console.log("[%s] initialized", MODULE_NAME);
});

function resSendJsonProtected(res, data) {
    // http://tobyho.com/2011/01/28/checking-types-in-javascript/
    if (data !== null && typeof data === 'object') {
        res.set('Content-Type', 'application/json');
        // JSON Vulnerability Protection
        // http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx/
        // https://docs.angularjs.org/api/ng/service/$http#description_security-considerations_cross-site-request-forgery-protection
        res.send(")]}',\n" + JSON.stringify(data));
    } else if (typeof data === 'string') {
        res.send(data);
    } else {
        res.send(data);
    }
};
class SearchSounds {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    index(callback = null) {
        console.log("[%s] req: %s", MODULE_NAME, JSON.stringify(this.req.params));
        console.log('req.body:', this.req.body);
        let type = this.req.params.type;
        let actionType = this.req.params.actionType;
        let id1 = this.req.params.searchParam;
        let id2 = this.req.params.searchParam2;
        let searchQuery = type;
        console.log("[%s] searching for: %s", MODULE_NAME, searchQuery);
        access_1.search(searchQuery, function(results, response_id, collect_url) {
            console.log("[%s] finished search for: %s", MODULE_NAME, searchQuery);
            console.log("[%s] collect_url: %s", MODULE_NAME, collect_url);
            console.log("[%s] response_id: %s", MODULE_NAME, response_id);
            console.log("[%s] results: %s", MODULE_NAME, JSON.stringify(results));
            let collectOptions = {};
            access_1.collectWait(response_id, collectOptions, function(result) {
                console.log("[%s] collect result: %s", MODULE_NAME, JSON.stringify(result));
                resSendJsonProtected(this.res, { data: result, accessId: accessId, success: true });
            }.bind(this));
        }.bind(this));
        // resSendJsonProtected(this.res, { data: null, accessId: accessId, success: false, msg: "Not matching API signature" });
    }
} // CLASS END
// curl -v -H "Content-Type: application/json" -X GET http://127.0.0.1:8005/search-sounds/bird
// curl -v -H "Content-Type: application/json" -X GET http://127.0.0.1:8005/search-sounds/children/in-map/58068a04a37162160341d402/59d3bdcf0d1f92de005c85a9
// https://stackoverflow.com/questions/15651510/can-typescript-export-a-function
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
function index(req, res) {
    let searchSounds = new SearchSounds(req, res);
    searchSounds.index();
}
exports.index = index;
//# sourceMappingURL=search-sounds.js.map