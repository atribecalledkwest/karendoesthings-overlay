/* global define TweenMax */
define([], function() {
    return {
        attach(self) {
            self.tl.add(function() {
                self.$.plate.style.webkitMaskImage = "none";
                let text = document.createElement("span"),
                    border = document.createElement("span");
                text.className = "text";
                border.className = "border";
                text.innerText = "Starting soon!";
                border.innerText = "Starting soon!";

                self.$.textholder.appendChild(text);
                self.$.textholder.appendChild(border);
            }).add(TweenMax.to({}, 0.30, {})).add(TweenMax.to(self.$.placeholder, 0.75, {
                opacity: 0
            }));
            return "attached";
        },
        detach(self) {
            self.tl.add(TweenMax.to(self.$.placeholder, 0.75, {
                opacity: 1,
                onComplete() {
                    self.$.textholder.innerHTML = "";
                }
            }));
            return "detached";
        },
        name: "starting",
        longname: "Starting Soon!"
    };
});
