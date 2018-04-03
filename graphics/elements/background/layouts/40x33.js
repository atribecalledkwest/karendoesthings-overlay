/* global define TweenMax */
define([], function() {
    return {
        attach(self) {
            self.tl.add(function() {
                self.$.plate.style.webkitMaskImage = "url(img/masks/mask-40x33.png)";
            }).add(TweenMax.to({}, 0.35, {})).add(TweenMax.to(self.$.placeholder, 0.75, {
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
        name: "40x33",
        longname: "40x33 (Melee)"
    };
});
