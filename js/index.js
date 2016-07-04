/// <reference path="../typings/index.d.ts" />
"use strict";
var request = require("request");
var endpoint = "http://www.abc.net.au/dat/news/elections/federal/2016/results/OnlinePartyGroupTrends.jsonp.js";
function getData(callback) {
    request(endpoint, function (err, res, body) {
        if (err) {
            return callback(err);
        }
        body = body.replace(new RegExp("callback_OnlinePartyGroupTrends\\(([\\s\\S]+)\\);"), "$1");
        if (!body) {
            return callback("Cannot parse body");
        }
        try {
            var data = JSON.parse(body);
            return callback(null, data);
        }
        catch (err) {
            return callback(err);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getData;
