/* global define TweenMax */
define([], function() {
    return {
        attach(self) {
            self.tl.add(function() {
                self.$.plate.style.backgroundImage = "url(img/masked/bg-none.png)";
                let text = document.createElement("span"),
                    border = document.createElement("span");
                text.className = "text";
                border.className = "border";
                text.innerText = "BRB!";
                border.innerText = "BRB!";

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
        name: "brb",
        longname: "BRB Screen"
    };
});
