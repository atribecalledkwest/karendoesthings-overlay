/* global require nodecg Polymer TweenMax TimelineMax */
(function() {
    "use strict";
    require([
        "layouts/16x9",
        "layouts/4x3",
        "layouts/40x33",
        "layouts/starting",
        "layouts/brb",
        "layouts/none",
        // Fun with webcams!
        "layouts/16x9_webcam_rect",
        "layouts/16x9_webcam_square",
        "layouts/4x3_webcam"
    ], function() {
        let layouts = {};
        // Populate layouts
        for(var i = 0; i < arguments.length; i++) {
            let arg = arguments[i];
            layouts[arg.name] = arg;
        }

        Polymer({
            is: "background-layer",
            properties: {
                layout: {
                    type: String,
                    value: ""
                },
                _layout: {
                    type: Object,
                    value: {
                        attach() {},
                        detach() {}
                    }
                },
                tl: {
                    type: Object,
                    value: new TimelineMax({ autoRemoveChildren: true })
                },
                _rep: {
                    type: Object,
                    value: nodecg.Replicant("obs-scene", { defaultValue: "brb" })
                },
                // This is kinda hacky, but it's the only somewhat okay way I can think of to keep track of how long a fade out needs to be
                _fadeTime: {
                    type: Number,
                    value: 300
                }
            },
            ready: function ready() {
                let self = this;
                this.tl.add(TweenMax.to(self.$.placeholder, 0.01, { opacity: 0 }));
                nodecg.listenFor("obs-transition", function(time) {
                    self.fadeIn(time);
                });
                nodecg.listenFor("obs-scenechange", function(scene) {
                    self.setLayout(scene);
                });
                self._rep.on("declared", function(newVal) {
                    self.layout = newVal.value;
                    self.setLayout(newVal.value);
                });
            },
            fadeIn: function fadeIn(time) {
                let self = this;
                self.tl.add(TweenMax.to(self.$.placeholder, time / 1000, {
                    onStart() {
                        self._fadeTime = time;
                    },
                    opacity: 1
                }));
            },
            fadeOut: function fadeOut() {
                let self = this;
                self.tl.add(TweenMax.to(self.$.placeholder, self._fadeTime / 1000, {
                    opacity: 0
                }));
            },
            setLayout: function setLayout(scene) {
                let self = this;
                if(typeof layouts[scene] !== "object") return;

                self._layout.detach(self);
                self._layout = layouts[scene];
                self._layout.attach(self);
                self.fadeOut();
            }
        });
    });
})();
