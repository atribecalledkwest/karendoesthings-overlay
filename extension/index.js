module.exports = function(nodecg) {
    try {
        require("./components")(nodecg);
    } catch(e) {
        nodecg.log.error("Caught error:", e.stack);
        nodecg.log.error("Could not load components library, exiting.");
        process.exit(1);
    }

    if(nodecg.bundleConfig.use.streamlabs === true) {
        try {
            require("./streamlabs")(nodecg);
        } catch(e) {
            nodecg.log.error("Caught error:", e.stack);
            nodecg.log.error("Not loading StreamLabs library, will not get notifications about donations, subscriptions, follows, or hosts.");
        }
    } else {
        nodecg.log.info("Not loading StreamLabs library, will not get notifications about donations, subscriptions, follows, or hosts.");
    }
};
