/* global nodecg Polymer TweenMax TimelineMax Power1 type_replicants type_sound_replicants */
(function() {
    "use strict";

    let truncate = function truncate(text, maxLen = 23) {
        if(text.length > maxLen) {
            let truncated = text.substring(0, maxLen);
            truncated += "…";
            return truncated;
        }
        return text;
    };


    let options = {
        "enabled": {},
        "sound": {}
    };
    let replicants = {};
    for(let i in type_replicants) {
        let name = type_replicants[i],
            rep = nodecg.Replicant(name, { defaultValue: true });
        // Just set a default here because
        options.enabled[i] = true; 
        replicants[name] = rep;
        rep.on("change", function(newVal) {
            if(nodecg.bundleConfig.debug) nodecg.log.info(type_replicants[i], "changed:", newVal);
            options.sound[i] = newVal;
        });
    }
    for(let i in type_sound_replicants) {
        let name = type_sound_replicants[i],
            rep = nodecg.Replicant(name);
        options.sound[i] = true; 
        replicants[name] = rep;
        rep.on("change", function(newVal) {
            if(nodecg.bundleConfig.debug) nodecg.log.info(type_sound_replicants[i], "changed:", newVal);
            options.sound[i] = newVal;
        });
    }

    Polymer({
        is: "notify-panel",
        properties: {
            text: {
                type: String,
                value: "Donation!"
            },
            tl: {
                type: Object,
                value: new TimelineMax({ autoRemoveChildren: true })
            }
        },
        popup: function popup(type, user, amount) {
            let self = this;
            
            if(!(type in type_replicants)) {
                throw new Error(`Type of ${type} has not been implemented`);
            }

            if(type in options.enabled && !options.enabled[type]) {
                return;
            }

            if((type === "bits" || type === "donation") && typeof amount === "undefined") {
                throw new Error(`New ${type} from user ${user} doesn't have amount go with it`);
            }

            this.tl.add(TweenMax.to({}, 0.01, {
                onStart: function() {
                    let text = "";
                    if(type === "follow") {
                        text = "New follower!";
                    } else if(type === "bits") {
                        text = amount + "x bits!"; 
                    } else if(type === "donation") {
                        text = amount + " donation!";
                    } else if(type === "subscription") {
                        if(typeof amount !== "undefined" && amount > 1) {
                            text = amount + "x resub!";
                        } else {
                            text = "New subscription!";
                        }
                    }
                    self.$.paneltext.innerText = text;
                }
            })).add(TweenMax.to(self.$.panel, 0.75, {
                onStart: function() {
                    nodecg.log.info(type, type in options.sound, options.sound[type]);
                    if(type in options.sound && options.sound[type]) {
                        nodecg.playSound("success");
                    }
                },
                top: "0px",
                ease: Power1.easeInOut
            })).add(TweenMax.to({}, 3, {
            })).add(TweenMax.to(self.$.paneltext, 0.25, {
                opacity: 0,
                onComplete: function() {
                    self.$.paneltext.innerText = truncate(user);
                }
            })).add(TweenMax.to(self.$.paneltext, 0.25, {
                opacity: 1
            })).add(TweenMax.to({}, 3, {
            })).add(TweenMax.to(self.$.panel, 0.75, {
                onStart: function() {
                    if(type in options.sound && options.sound[type]) {
                        nodecg.playSound("slide");
                    }
                },
                top: "-80px",
                ease: Power1.easeInOut
            })).add(TweenMax.to({}, 1.5, {}));
            return this;
        }
    });

    let setup = function setup() {
        if(!nodecg.bundleConfig) {
            return;
        }
        let panel = document.querySelector("notify-panel");

        // Follower listener is separate from other twitch stuff because loltwitch.
        if(nodecg.bundleConfig.use.twitch || nodecg.bundleConfig.debug) {
            if(nodecg.bundleConfig.debug) nodecg.log.info("Setting up follow listener");
            nodecg.listenFor("follow", function(content) {
                if(nodecg.bundleConfig.debug) nodecg.log.info("Got follow:", content.user);
                if(typeof content.user.display_name === "string") {
                    panel.popup("follow", content.user.display_name);
                } else {
                    panel.popup("follow", content.user.name);
                }
            });
        }
        // IRC allows us to listen to subscription and bit events.
        if(nodecg.bundleConfig.use.irc || nodecg.bundleConfig.debug) {
            if(nodecg.bundleConfig.debug) nodecg.log.info("Setting up bits and subscription listener");
            nodecg.listenFor("bits", function(content) {
                if(nodecg.bundleConfig.debug) nodecg.log.info("Got bits:", content.username, content.bits);
                panel.popup("bits", content.username, content.bits);
            });
            nodecg.listenFor("subscription", function(content) {
                if(nodecg.bundleConfig.debug) nodecg.log.info("Got subscription:", content.username, content.months);
                panel.popup("subscription", content.username, content.months);
            });
        }
        // Donations are processed seperately through StreamTip
        if(nodecg.bundleConfig.use.donations || nodecg.bundleConfig.debug) {
            if(nodecg.bundleConfig.debug) nodecg.log.info("Setting up donation listener");
            nodecg.listenFor("donation", function(content) {
                let amountstr = `${content.currencySymbol}${content.amount}`;
                if(nodecg.bundleConfig.debug) nodecg.log.info("Got dontion:", content.username, amountstr);
                panel.popup("donation", content.username, amountstr);
            });
        }
    };
    setup();
})();
