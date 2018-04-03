/* global define TweenMax */
define([], function() {
    return {
        attach(self) {
            self.tl.add(function() {
                self.$.plate.style.webkitMaskImage = "none";
            }).add(TweenMax.to({}, 0.30, {})).add(TweenMax.to(self.$.placeholder, 0.75, {
                opacity: 0
            }));
            return "attached";
        },
        detach(self) {
            self.tl.add(TweenMax.to(self.$.placeholder, 0.75, {
                opacity: 1
            }));
            return "detached";
        },
        name: "none",
        longname: "Blank Screen"
    };
});
