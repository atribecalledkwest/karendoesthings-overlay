(function() {
    "use strict";
    const request = require("request-promise"); 

    let diff = function(a1, a2) {
        return a2.filter(function(i) {
            return a1.indexOf(i) === -1;
        });
    };

    module.exports = function(nodecg) {
        if(!nodecg.bundleConfig) {
            nodecg.log.error("cfg/karendoesthings-overlay.json not found, Twitch module will be disabled.");
            return;
        } else if(typeof nodecg.bundleConfig.twitch === "undefined") {
            nodecg.log.error("`twitch` is not defined in cfg/karendoesthings-overlay.json, Twitch module will be disabled.");
            return;
        }
        let firstrun = true;
        let recent = {};
        let check = function check() {
            let options = {
                uri: `https://api.twitch.tv/kraken/channels/${nodecg.bundleConfig.twitch.userid}/follows`,
                method: "GET",
                headers: {
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Client-ID": nodecg.bundleConfig.twitch.clientid
                },
                json: true
            };
            request(options).then(function(parsed) {
                if(firstrun) {
                    recent = parsed.follows;
                    firstrun = false;
                } else {
                    let result = diff(recent, parsed.follows);
                    result.forEach(function(follower) {
                        nodecg.sendMessage("follow", follower);
                    });
                }
            }).catch(function(e) {
                nodecg.log.error("Twitch error:", e);
            });
        };
        setInterval(check, 15*1000);
        check();
    };
})();