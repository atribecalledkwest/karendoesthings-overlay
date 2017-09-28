(function() {
    "use strict";
    const WebSocket = require("ws");

    module.exports = function(nodecg) {
        if(!nodecg.bundleConfig) {
            nodecg.log.error("cfg/karendoesthings-overlay.json not found, OBS module will be disabled.");
            return;
        } else if(typeof nodecg.bundleConfig.obs === "undefined") {
            nodecg.log.error("`obs` is not defined in cfg/karendoesthings-overlay.json, OBS module will be disabled.");
            return;
        }

        let rate = 5,
            minRate = 5,
            maxRate = 30;

        let id = 0;

        let setup = function() {
            let sock = new WebSocket(nodecg.bundleConfig.obs.url);

            let scene = nodecg.Replicant("obs-scene", { defaultValue: "brb" });

            sock.onopen = function() {
                if(nodecg.bundleConfig.debug) nodecg.log.info("Connected to OBS:", nodecg.bundleConfig.obs.url);
                rate = minRate;
                sock.send(JSON.stringify({
                    "request-type": "GetSceneList",
                    "message-id": id
                }));
                id++;
            };

            sock.onmessage = function(message) {
                let data = JSON.parse(message.data);

                if(data["update-type"] === "SwitchScenes") {
                    let type = data["scene-name"].split(".").pop();
                    scene.value = type;
                    nodecg.sendMessage("obs-scenechange", type);
                } else if(data["update-type"] === "TransitionBegin") {
                    nodecg.sendMessage("obs-transition", data.duration);
                } else if(typeof data["current-scene"] !== "undefined") {
                    // This lets us make sure we track scene changes even if the server had to be restarded in the middle of one of them
                    let type = data["current-scene"].split(".").pop();
                    scene.value = type;
                }
            };

            sock.onerror = function(e) {
                nodecg.log.error("OBS error:", e);
                rate = Math.min(rate + 2, maxRate);
            };

            sock.onclose = function() {
                if(nodecg.bundleConfig.debug) nodecg.log.info(`Connection to OBS stopped, retrying in ${rate} seconds...`);
                setTimeout(function() {
                    setup();
                }, rate*1000);
            };
        };

        setup();
    };
})();
