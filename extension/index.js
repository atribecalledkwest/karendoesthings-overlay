module.exports = function(nodecg) {
    try {
        require("./components")(nodecg);
    } catch(e) {
        nodecg.log.error("Caught error:", e.stack);
        nodecg.log.error("Could not load components library, exiting.");
        process.exit(1);
    }

    if(nodecg.bundleConfig.use.twitch === true) {
        try {
            require("./twitch")(nodecg);
        } catch(e) {
            nodecg.log.error("Caught error:", e.stack);
            nodecg.log.error("Not loading Twitch library, will not get notifications about follows.");
        }
    } else {
        nodecg.log.info("Not using Twitch library, will not get notifications about follows.");
    }

    if(nodecg.bundleConfig.use.irc === true) {
        try {
            require("./irc")(nodecg);
        } catch(e) {
            nodecg.log.error("Caught error: ", e.stack);
            nodecg.log.error("Not loading IRC library, will not get notifications about subscriptions or bits.");
        }
    } else {
        nodecg.log.info("Not using IRC library, will not get notifications about subscriptions or bits.");
    }

    if(nodecg.bundleConfig.use.lastfm === true) {
        try {
            require("./lastfm")(nodecg);
        } catch(e) {
            nodecg.log.error("Caught error: ", e.stack);
            nodecg.log.error("Not loading LastFM library, will not get now playing notifications.");
        }
    } else {
        nodecg.log.info("Not loading LastFM library, will not get now playing notifications.");
    }

    if(nodecg.bundleConfig.use.streamtips === true) {
        try {
            require("./streamtips")(nodecg);
        } catch(e) {
            nodecg.log.error("Caught error:", e.stack);
            nodecg.log.error("Not loading StreamTips library, will not get notifications about donations.");
        }
    } else {
        nodecg.log.info("Not loading StreamTips library, will not get notifications about donations."); 
    }
};
