/* global nodecg Polymer TweenMax TimelineMax */
(function() {
    "use strict";
    Polymer({
        is: "background-layer",
        properties: {
            layout: {
                type: String,
                value: "16x9"
            }
        },
        ready: function ready() {
            this.setLayout(this.layout);
        },
        setLayout: function setLayout(name) {
            if(!name) return;
            //this.$.plate.style.WebkitMaskImage = `url(img/mask_${name}.svg)`;
            this.layout = name;
        }
    });
})();