module.exports = function(nodecg) {
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
};
