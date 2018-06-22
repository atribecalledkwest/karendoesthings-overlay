module.exports = function(nodecg) {
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
};
