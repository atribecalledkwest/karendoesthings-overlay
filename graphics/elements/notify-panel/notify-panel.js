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


    Polymer({
        is: "notify-panel",
        properties: {
            text: {
                type: String,
                value: "Donation!"
            },
            tl: {
                type: Object,
                value: new TimelineMax()
            }
        },
        popup: function popup(type, user, amount) {
            let self = this;
            
            if(!(type in type_replicants)) {
                throw new Error(`Type of ${type} has not been implemented`);
            }

            const reptoggle = nodecg.Replicant(type_replicants[type], { defaultValue: true }),
                repsoundtoggle = nodecg.Replicant(type_sound_replicants[type], { defaultValue: true });

            if(typeof reptoggle.value !== "undefined" && !reptoggle.value) {
                return;
            }

            if((type === "bits" || type === "donation") && typeof amount === "undefined") {
                throw new Error(`New ${type} from user ${user} doesn't have amount go with it`);
            }

            this.tl.add(function() {
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
                self.text = text;
            }, 0.01).add(TweenMax.to(self.$.panel, 0.75, {
                onStart: function() {
                    if(typeof repsoundtoggle.value !== "undefined" && repsoundtoggle.value) {
                        nodecg.playSound("success");
                    }
                },
                top: "0px",
                ease: Power1.easeInOut
            })).add(TweenMax.to({}, 3, {
            })).add(TweenMax.to(self.$.paneltext, 0.25, {
                opacity: 0
            })).add(function() {
                self.text = truncate(user);
            }).add(TweenMax.to(self.$.paneltext, 0.25, {
                opacity: 1
            })).add(TweenMax.to({}, 3, {
            })).add(TweenMax.to(self.$.panel, 0.75, {
                onStart: function() {
                    if(typeof repsoundtoggle.value !== "undefined" && repsoundtoggle.value) {
                        nodecg.playSound("slide");
                    }
                },
                top: "-80px",
                ease: Power1.easeInOut
            })).add(TweenMax.to({}, 1.5, {}));
            return this;
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        if(!nodecg.bundleConfig) {
            return;
        }
        let panel = document.querySelector("nofiy-panel");

        // Follower listener is separate from other twitch stuff because loltwitch.
        if(nodecg.bundleConfig.use.twitch) {
            nodecg.listenFor("follow", "karendoesthings", function(content) {
                if(typeof content.user.display_name === "string") {
                    panel.popup("follow", content.user.display_name);
                } else {
                    panel.popup("follow", content.user.name);
                }
            });
        }
        // IRC allows us to listen to subscription and bit events.
        if(nodecg.bundleConfig.use.irc) {
            nodecg.listenFor("bits", "karendoesthings", function(content) {
                panel.pupup("bits", content.username, content.bits);
            });
            nodecg.listenFor("subscription", "karendoesthings", function(content) {
                panel.popup("subscription", content.username, content.months);
            });
        }
    });
})();
