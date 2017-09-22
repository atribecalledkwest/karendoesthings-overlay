(function() {
    "use strict";
    const LastFmNode = require("lastfm").LastFmNode;

    module.exports = function(nodecg) {
        if(!nodecg.bundleConfig) {
            nodecg.log.error("cfg/karendoesthings-overlay.json not found, LastFM module will be disabled.");
            return;
        } else if(typeof nodecg.bundleConfig.lastfm === "undefined") {
            nodecg.log.error("`lastfm` is not defined in cfg/karendoesthings-overlay.json, LastFM module will be disabled.");
            return;
        }

        const lastfm = new LastFmNode({
            api_key: nodecg.bundleConfig.lastfm.apikey,
            secret: nodecg.bundleConfig.lastfm.sharedsecret
        });
        const trackstream = lastfm.stream(nodecg.bundleConfig.lastfm.target);

        let nprep = nodecg.Replicant("nowplaying");

        trackstream.on("nowPlaying", function(track) {
            let nowplaying = {
                artist: track.artist["#text"],
                song: track.name,
                album: track.album["#text"] || track.artist["#text"],
                cover: track.image.pop()["#text"]
            };
            // Filter out non-nowplaying songs
            if(!track.hasOwnProperty("@attr") || !track["@attr"].hasOwnProperty("nowplaying") || track["@attr"].nowplaying !== "true") {
                return;
            }
            // Filters out potential duplicates
            if(nprep.value["song"] === nowplaying.song && nprep.value["artist"] === nowplaying.artist) {
                return;
            }
            nprep.value = nowplaying;
            if(nodecg.bundleConfig.debug) nodecg.log.info("Now playing:", nowplaying.artist, "-", nowplaying.song);
            nodecg.sendMessage("nowplaying", nowplaying);
        });

        trackstream.on("error", function(e) {
            if(nodecg.bundleConfig.debug) nodecg.log.error("Caught error:", e);
        });

        trackstream.start();
    };
})();
