const MODULE_NAME: string = "@audio-commons/mediator-access";

let config = require('@colabo-utils/i-config');

var http = require("https");
// We need this to build our post string
var querystring = require('querystring');

var client_id;
var username;
var password;

var tokenCredentials = {
    access_token: null,
    expires_in: null,
    token_type: null,
    scope: null,
    refresh_token: null
}

export var status = {
    debug: true,
    showError: true,
    showFinals: true
}

export var searches = {
    active: {},
    finished: {}
}

// curl -X POST https://m.audiocommons.org/api/o/token/ -d 'client_id=<YOUR_CLIENT_ID>&grant_type=password&username=<YOUR_USERNAME>&password=<YOUR_PASSWORD>'
export function getToken(callback) {

    // https://stackoverflow.com/questions/6819143/curl-equivalent-in-nodejs
    // https://gist.github.com/bdickason/1105888
    // https://www.npmjs.com/package/curlrequest
    // https: //github.com/mrsarm/reqclient#logging-with-curl-style
    // https://stackoverflow.com/questions/6158933/how-to-make-an-http-post-request-in-node-js
    // Build the post string from an object
    var post_data = querystring.stringify({
        'client_id': client_id,
        'grant_type': 'password',
        'username': username,
        'password': password
    });

    var options = {
        host: 'm.audiocommons.org',
        // https://stackoverflow.com/questions/15421050/node-request-getting-error-ssl23-get-server-hellounknown-protocol
        port: 443,
        path: '/api/o/token/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    if (status.debug) console.log("getToken: http path: ", options.path);
    // TODO support detecting and forwarding errors
    var req = http.request(options, function (res) {
        var bodyStr = "";
        if (status.debug) console.log('STATUS: ' + res.statusCode);
        if (status.debug) console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            if (status.debug) console.log('chunk length: ' + chunk.length);
            bodyStr += chunk;
        });
        res.on('end', function () {
            if (status.debug) console.log('bodyStr: ' + bodyStr);
            var body = JSON.parse(bodyStr);
            tokenCredentials.access_token = body.access_token;
            tokenCredentials.expires_in = body.expires_in;
            tokenCredentials.token_type = body.token_type;
            tokenCredentials.scope = body.scope;
            tokenCredentials.refresh_token = body.refresh_token;

            callback(tokenCredentials);
        });
    });

    req.on('error', function (e) {
        if (status.showError) console.error('problem with request: ' + e.message);
    });

    // write data to request body
    if (status.debug) console.log("Request data: ", post_data);
    req.write(post_data);
    req.end();
};

// curl -i -H "Authorization: Bearer MMOeBDmt0mHC6NY99xH6bN9yfPkMck" https://m.audiocommons.org/api/v1/search/text/?q=cars
export function search(searchQuery, callback) {

    var options = {
        host: 'm.audiocommons.org',
        port: 443,
        path: '/api/v1/search/text/?q=' + searchQuery,
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + tokenCredentials.access_token
        }
    };

    if (status.debug) console.log("search: http path: ", options.path);
    var req = http.request(options, function (res) {
        var bodyStr = "";
        if (status.debug) console.log('STATUS: ' + res.statusCode);
        if (status.debug) console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            if (status.debug) console.log('chunk length: ' + chunk.length);
            bodyStr += chunk;
        });
        res.on('end', function () {
            if (status.debug) console.log('bodyStr: ' + bodyStr);
            var body = JSON.parse(bodyStr);
            let response_id = body.meta.response_id;
            let collect_url = body.meta.collect_url;

            callback(body, response_id, collect_url);
        });
    });

    req.on('error', function (e) {
        if (status.showError) console.error('problem with request: ' + e.message);
    });

    req.end();
};

// curl -i -H "Authorization: Bearer MMOeBDmt0mHC6NY99xH6bN9yfPkMck" https://m.audiocommons.org/api/v1/collect/?rid=ed360c90-3221-4ecc-a471-01ec5ca4a915
export function collect(rid, callback) {
    // rid = 'b8f9ad41-c3a5-4417-baa2-046864a9cc34'
    // https://m.audiocommons.org/api/v1/collect/?rid=b8f9ad41-c3a5-4417-baa2-046864a9cc34

    // rid = '937f1086-c42e-4aa2-bfc5-7ce516e914a0';
    // rid = '3e376fb8-1eab-4059-a848-074454dd8028';
    var options = {
        host: 'm.audiocommons.org',
        port: 443,
        path: '/api/v1/collect/?rid=' + rid,
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + tokenCredentials.access_token
        }
    };

    if (status.debug) console.log("collect: http path: ", options.path);
    var req = http.request(options, function (res) {
        var bodyStr = "";
        if (status.debug) console.log("[%s:collect] STATUS: %s", MODULE_NAME, res.statusCode);
        if (status.debug) console.log("[%s:collect] HEADERS: %s", MODULE_NAME, JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            if (status.debug) console.log("[%s] chunk length: %s", MODULE_NAME, chunk.length);
            bodyStr += chunk;
        });
        res.on('end', function () {
            if (status.debug) console.log("[%s] bodyStr: %s", MODULE_NAME, bodyStr);
            var body = JSON.parse(bodyStr);

            callback(body);
        });
    });

    req.on('error', function (e) {
        if (status.showError) console.error("[%s] problem with request: %s", MODULE_NAME, e.message);
    });

    req.end();
}

export function collectWait(rid:string, collectOptions:any, callback:Function){
    collectOptions = collectOptions || {};

    let collectRequestNo = 0;
    let shouldFinish = false;

    function collectFinished(result) {
        console.log("[%s] Search result: %s", MODULE_NAME, result);

        if (collectOptions.collectRequestNoMax === collectRequestNo){
            console.log("[%s] collectOptions.collectRequestNoMax (%s) === collectRequestNo (%s)", MODULE_NAME, collectOptions.collectRequestNoMax, collectRequestNo);
            shouldFinish = true;
        }
        if (collectOptions.stopAfterFreesound && result.contents.Freesound) {
            console.log("[%s] collectOptions.stopAfterFreesound (%s) && result.contents.Freesound (%s)", MODULE_NAME, collectOptions.stopAfterFreesound, result.contents.Freesound);
            shouldFinish = true;
        }
        if (result.meta.n_received_responses >= result.meta.n_expected_responses){
            console.log("[%s] result.meta.n_expected_responses (%s) >= result.meta.n_received_responses (%s)", MODULE_NAME, result.meta.n_expected_responses, result.meta.n_received_responses);
            shouldFinish = true;
        }

        if (!shouldFinish){
            console.log("Collecting try num: ", collectRequestNo++);
            collect(rid, collectFinished);
        }else{
            var previewUrl = result.contents.Freesound.results[0]["ac:preview_url"];
            var downloadName = /[^/]*$/.exec(previewUrl)[0];
            console.log("Freesound preview sound url: ", previewUrl);
            var downloadPath = "./sounds/" + downloadName;
            console.log("local downloadPath: ", previewUrl);
            callback(result);

            // download.downloadFile(previewUrl, downloadPath,
            //     function (err) {
            //         console.log("Downloaded sound: ", previewUrl);
            //         if (err) { console.error(err) } else {
            //             var previewSoundExtension = /[^.]*$/.exec(downloadName)[0];
            //             var outputName = /(.*)\.[^.]*$/.exec(downloadName)[1];
            //             outputNameFull = "./sounds/" + outputName + ".mp3";
            //             transcode.transcodeFile(downloadPath, outputNameFull, function () {
            //                 player.play(outputNameFull);
            //             });
            //         }
            //     });
            // }
        }
    }
    console.log("Collecting try num: ", collectRequestNo++);
    collect(rid, collectFinished);
}
export function init(callback) {
    let puzzleConfig:any = config.GetPuzzle(MODULE_NAME);
    console.log("[%s] client_id = ", MODULE_NAME, puzzleConfig.client_id);
    console.log("[%s] username = ", MODULE_NAME, puzzleConfig.username);

    client_id = puzzleConfig.client_id;
    username = puzzleConfig.username;
    password = puzzleConfig.password;

    getToken(function (tokenCredentials) {
        console.log("Initialized. Go on! Use:\n\tac.searchHigh('dance')");
        if (typeof callback === 'function') callback();
    });
}