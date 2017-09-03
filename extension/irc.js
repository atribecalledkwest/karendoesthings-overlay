(function() {
    "use strict";
    const chat = require("tmi.js");

    module.exports = function(nodecg) {
        if(!nodecg.bundleConfig) {
            nodecg.log.error("cfg/karendoesthings-overlay.json not found, IRC module will be disabled.");
            return;
        } else if(typeof nodecg.bundleConfig.irc === "undefined") {
            nodecg.log.error("`irc` not defined in cfg/karendoesthings-overlay.json, IRC module will be disabled.");
            return;
        }

        const client = new chat.client(nodecg.bundleConfig.irc);
        
        client.connect();
        
        client.addListener("connected", function() {
            nodecg.log.info(`Listening for subscribers on ${nodecg.bundleConfig.irc.channels.join(", ")}`);
        });
        client.addListener("disconnected", function(reason) {
            nodecg.log.warn(`DISCONNECTED: ${reason}`);
        });

        client.addListener("subscription", function(channel, username) {
            let content = {
                "username": username,
                "channel": channel.replace("#", ""),
                "months": 1
            };
            nodecg.sendMessage("subscription", content);
        });
        client.addListener("resub", function(channel, username, months) {
            let content = {
                "username": username,
                "channel": channel.replace("#", ""),
                "months": parseInt(months, 10)
            };
            nodecg.sendMessage("subscription", content);
        });
        client.addListener("cheer", function(channel, userstate, message) {
            let content = {
                "username": userstate.username,
                "bits": parseInt(userstate.bits, 10),
                "message": message
            };
            nodecg.sendMessage("bits", content);
        });
        
        client.addListener("chat", function(channel, userstate, message) {
            if(userstate.username !== channel.replace("#", "")) {
                return;
            }
            
            let parts = message.split(" ");
            let cmd = parts[0];
            parts.splice(0, 1);
            let args = parts;

            let name;
            if(args.length < 1) {
                name = "KarenDoesThings";
            } else {
                name = args[0];
            }

            let content = {
                "username": name,
                "channel": channel.replace("#", ""),
                "months": -1
            };
            switch(cmd) {
            case "!testsub":
                content["months"] = 1;
                nodecg.sendMessage("subscription", content);
                nodecg.log.info(`Got a forced sub notification for ${content.name}`);
                break;
            case "!testresub":
                var times;
                if(args.length < 2) {
                    times = Math.floor(Math.random() * 10);
                } else {
                    times = parseInt(args[1], 10);
                }
                content["months"] = times;
                nodecg.sendMessage("subscription", content);
                nodecg.log.info(`Got a forced sub notification for ${content.name} ${content.months} times`);
                break;
            default:
                break;
            }
        });
    };
})();