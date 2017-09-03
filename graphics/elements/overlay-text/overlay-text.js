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
            }
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
    let rep = nodecg.Replicant("overlay-text", { defaultValue: "KarenDoesThings" });
    rep.on("change", function(newVal) {
        let ot = document.querySelector("overlay-text");
        ot.change(newVal); 
    });
})();
