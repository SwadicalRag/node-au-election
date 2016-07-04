/// <reference path="../typings/index.d.ts" />

import * as request from "request";

import {IElectionData} from "./interfaces";

let endpoint = "http://www.abc.net.au/dat/news/elections/federal/2016/results/OnlinePartyGroupTrends.jsonp.js";

export default function getData(callback:(err,data?:IElectionData) => void) {
    request(endpoint,(err,res,body:string) => {
        if(err) {
            return callback(err);
        }

        body = body.replace(new RegExp("callback_OnlinePartyGroupTrends\\(([\\s\\S]+)\\);"),"$1");

        if(!body) {
            return callback("Cannot parse body");
        }

        try {
            let data = JSON.parse(body);

            return callback(null,data);
        }
        catch(err) {
            return callback(err);
        }
    })
}
