/* global nodecg Polymer TweenMax TimelineMax Bounce Power4 */
(function() {
    "use strict";

    let enableNowPlaying = true;
    let nprep = nodecg.Replicant("enable-now-playing", { defaultValue: true });
    nprep.on("change", function(newVal) {
        if(nodecg.bundleConfig.debug) nodecg.log.info("enable-now-playing changed", newVal);
        enableNowPlaying = newVal;
    });

    let panel = document.querySelector("now-playing");

    Polymer({
        is: "now-playing",
        properties: {
            artist: {
                type: String,
                value: "Artist"
            },
            song: {
                type: String,
                value: "Song"
            },
            isShowing: {
                type: Boolean,
                value: false
            },
            tl: {
                type: Object,
                value: new TimelineMax({ autoRemoveChildren: true })
            }
        },
        ready: function ready() {
            this.tl.add([
                TweenMax.to(this.$.toppart, 0.01, {
                    x: "-100%",
                    opacity: 0
                }),
                TweenMax.to(this.$.bottompart, 0.01, {
                    x: "-100%",
                    opacity: 0
                }),
            ]);
        },
        popup: function popup(artist, song) {
            if(!enableNowPlaying) return;
            let self = this;
            // Change the current song. Putting it on the timeline makes sure it doesn't interfere with the popup if it's already showing.
            this.tl.add(function() {
                self.artist = artist;
                self.song = song;
                self.showing = true;
            });

            this.tl.add([
                TweenMax.to(this.$.toppart, 0.01, {
                    opacity: 1
                }),
                TweenMax.to(this.$.bottompart, 0.01, {
                    opacity: 1
                })
            ]);

            // Pop in
            this.tl.add(TweenMax.to(this.$.toppart, 1.15, {
                x: "0%",
                ease: Bounce.easeOut
            })).add(TweenMax.to(this.$.bottompart, 1.15, {
                x: "0%",
                ease: Bounce.easeOut
            }), "-=0.4");

            // Wait
            this.tl.add(TweenMax.to({}, 5.5, {}));

            // Slide out
            this.tl.add(TweenMax.to(this.$.bottompart, 1.15, {
                x: "-100%",
                ease: Power4.easeInOut
            })).add(TweenMax.to(this.$.toppart, 1.15, {
                x: "-100%",
                ease: Power4.easeInOut,
                onComplete: function() {
                    self.showing = false;
                }
            }), "-=0.775");

            // We toggle opacity from 0->1->0 because it removes an annoying sliver left over from one popup to the next
            this.tl.add([
                TweenMax.to(this.$.toppart, 0.01, {
                    opacity: 0
                }),
                TweenMax.to(this.$.bottompart, 0.01, {
                    opacity: 0
                })
            ]);

            // Buffer
            this.tl.add(TweenMax.to({}, 1, {}));
            return this;
        }
    });

    nodecg.listenFor("nowplaying", function(track) {
        panel.popup(track.artist, track.song);
    });
})();