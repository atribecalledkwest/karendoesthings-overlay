module.exports = function(nodecg) {
    try {
        require("./components")(nodecg);
    } catch(e) {
        nodecg.log.error("Caught error:", e.stack);
        nodecg.log.error("Could not load components library, exiting.");
        process.exit(1);
    }

    if(nodecg.bundleConfig.use.lastfm === true) {
        try {
            require("./lastfm")(nodecg);
        } catch(e) {
            nodecg.log.error("Caught error:", e.stack);
            nodecg.log.error("Not loading LastFM library, will not get notifications about currently playing song.");
        }
    } else {
        nodecg.log.info("Not loading LastFM library, will not get notifications about currently playing song.");
    }

    if(nodecg.bundleConfig.use.obs === true) {
        try {
            require("./obs")(nodecg);
        } catch(e) {
            nodecg.log.error("Caught error:", e.stack);
            nodecg.log.error("Not loading OBS library, will not automatically change layouts on scene change.");
        }
    } else {
        nodecg.log.info("Not loading OBS library, will not automatically change layouts on scene change.");

    }
};
