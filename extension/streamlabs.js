(function() {
    "use strict";
    const io = require("socket.io-client");

    module.exports = function(nodecg) {
        if(!nodecg.bundleConfig) {
            nodecg.log.error("cfg/karendoesthings-overlay.json not found, StreamLabs module will be disabled.");
            return;
        } else if(typeof nodecg.bundleConfig.streamlabs === "undefined") {
            nodecg.log.error("`streamlabs` not defined in cfg/karendoesthings-overlay.json, StreamLabs module will be disabled.");
            return;
        }

        const streamlabs = io.connect(`https://sockets.streamlabs.com/?token=${nodecg.bundleConfig.streamlabs.sockettoken}`, { reconnect: true });
        streamlabs.on("connect", function() {
            nodecg.log.info("Connected to StreamLabs.");
        });
        streamlabs.on("event", function(event) {
            // This isn't really needed, but it makes the client-side code a bit less messy
            switch(event.type) {
            case "follow":
                nodecg.sendMessage("follow", event);
                break;
            case "bits":
                nodecg.sendMessage("bits", event);
                break;
            case "donation":
                nodecg.sendMessage("donation", event);
                break;
            case "host":
                nodecg.sendMessage("host", event);
                break;
            case "subscription":
                nodecg.sendMessage("subscription", event);
                break;
            default:
                break;
            }
        });
        streamlabs.on("disconnect", function() {
            nodecg.log.info("Disconnected from StreamLabs");
        });
    };
})();
