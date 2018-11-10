const MODULE_NAME: string = "@audio-commons/mediator-express/search-sounds";

declare var require: any;
declare var global: any;

var accessId = 0;

import { search, init} from "@audio-commons/mediator-access";

// TODO: here we need to wait for finish
// and support renewing token
init(function () {
	console.log("[%s] initialized", MODULE_NAME);
});

function resSendJsonProtected(res, data) {
    // http://tobyho.com/2011/01/28/checking-types-in-javascript/
    if (data !== null && typeof data === 'object') { // http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
        res.set('Content-Type', 'application/json');
        // JSON Vulnerability Protection
        // http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx/
        // https://docs.angularjs.org/api/ng/service/$http#description_security-considerations_cross-site-request-forgery-protection
        res.send(")]}',\n" + JSON.stringify(data));
    } else if (typeof data === 'string') { // http://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string
        res.send(data);
    } else {
        res.send(data);
    }
};

class SearchSounds {
	constructor(protected req:any, protected res:any){
	}

	index(callback:Function = null){
		console.log("[%s] req: %s", MODULE_NAME, JSON.stringify(this.req.params));
		console.log('req.body:', this.req.body);

		let type = this.req.params.type;
		let actionType = this.req.params.actionType;
		let id1 = this.req.params.searchParam;
		let id2 = this.req.params.searchParam2;
		let searchQuery = type;

		console.log("[%s] searching for: %s", MODULE_NAME, searchQuery);
		search(searchQuery, function (results, response_id) {
			console.log("[%s] finished search for: %s", MODULE_NAME, searchQuery);
			console.log("[%s] response_id: %s", MODULE_NAME, response_id);
			// console.log("[%s] results: %s", MODULE_NAME, JSON.stringify(results));
			resSendJsonProtected(this.res, { data: results, accessId: accessId, success: true });
		}.bind(this));

		// resSendJsonProtected(this.res, { data: null, accessId: accessId, success: false, msg: "Not matching API signature" });
	}
} // CLASS END

// curl -v -H "Content-Type: application/json" -X GET http://127.0.0.1:8005/search-sounds/bird
// curl -v -H "Content-Type: application/json" -X GET http://127.0.0.1:8005/search-sounds/children/in-map/58068a04a37162160341d402/59d3bdcf0d1f92de005c85a9
// https://stackoverflow.com/questions/15651510/can-typescript-export-a-function
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
export function index(req:any, res:any){
	let searchSounds: SearchSounds = new SearchSounds(req, res);
	searchSounds.index();
}