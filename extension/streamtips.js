(function() {
    "use strict";
    const StreamTip = require("streamtip");

    module.exports = function(nodecg) {
        if(!nodecg.bundleConfig) {
            nodecg.log.error("cfg/karendoesthings-overlay.json not found, StreamTips module will be disabled.");
            return;
        } else if(typeof nodecg.bundleConfig.streamtips === "undefined") {
            nodecg.log.error("`streamtips` not defined in cfg/karendoesthings-overlay.json, StreamTips module will be disabled.");
            return;
        }
       
        const streamtips = new StreamTip({
            clientId: nodecg.bundleConfig.streamtips.clientid,
            accessToken: nodecg.bundleConfig.streamtips.accesstoken
        });
        
        streamtips.on("connected", function() {
            nodecg.log.info("Connected to StreamTips");
        });
        streamtips.on("authenticated", function() {
            nodecg.log.info("Authenticated to StreamTips");
        });
        streamtips.on("authenticationFailed", function() {
            nodecg.log.error("Authentication to StreamTips failed");
        });

        streamtips.on("newTip", function(tip) {
            nodecg.sendMessage("donation", tip);
        });
    };
})();