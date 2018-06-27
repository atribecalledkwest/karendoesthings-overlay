/* global nodecg Polymer TweenMax TimelineLite */
(function() {
    "use strict";
    Polymer({
        is: "overlay-text",
        properties: {
            current: {
                type: String,
                value: "KarenDoesThings"
            },
            tl: {
                type: Object,
                value: new TimelineLite({ autoRemoveChildren: true })
            },
            _rep: {
                type: Object,
                value: nodecg.Replicant("overlay-text", { defaultValue: "KarenDoesThings" })
            }
        },
        ready: function ready() {
            let self = this;
            self._rep.on("change", function(newVal) {
                self.change(newVal);
            });
        },
        change: function change(text) {
            let self = this;
            self.tl.add([
                TweenMax.to(self.$.overlayContent, 0.5, { opacity: 0 }),
                TweenMax.to(self.$.overlayBorder, 0.5, { opacity: 0 })
            ]).add(function() {
                self.current = text;
            }).add([
                TweenMax.to(self.$.overlayContent, 0.5, { opacity: 1 }),
                TweenMax.to(self.$.overlayBorder, 0.5, { opacity: 1 })
            ]);
        }
    });
})();
