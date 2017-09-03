const path = require("path");
const express = require("express");

module.exports = function(nodecg) {
    let app = express();
    let bower = path.resolve(__dirname, "../bower_components");
    app.use(`/bundles/${nodecg.bundleName}/components`, express.static(bower));
    nodecg.mount(app);
};
