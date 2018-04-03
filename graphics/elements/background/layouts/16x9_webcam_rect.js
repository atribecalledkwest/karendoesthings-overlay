/* global define TweenMax */
define([], function() {
    return {
        attach(self) {
            self.tl.add(function() {
                self.$.plate.style.webkitMaskImage = "url(img/masks/mask-16x9_webcam_rect.png)";
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
        name: "16x9_webcam_rect",
        longname: "16x9 (16x9 Webcam)"
    };
});
