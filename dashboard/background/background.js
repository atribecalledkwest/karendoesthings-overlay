/* global nodecg */
(function() {
    "use strict";
    require([
        "layouts/16x9",
        "layouts/4x3",
        "layouts/40x33",
        "layouts/5x3",
        "layouts/kc",
        "layouts/starting",
        "layouts/brb",
        "layouts/none",
        "layouts/16x9_webcam_rect",
        "layouts/16x9_webcam_square",
        "layouts/4x3_webcam"
    ], function() {
        let scene = nodecg.Replicant("obs-scene", { defaultValue: "brb" });
        let optionsbox = document.querySelector("div#options");

        for(let i = 0; i < arguments.length; i++) {
            let item = arguments[i];
            let button = document.createElement(`paper-button#layout_${item.name}`);
            button.id = `layout_${item.name}`;
            button.innerText = item.longname
            button.onclick = function() {
                scene.value = item.name;
                nodecg.sendMessage("obs-scenechange", item.name);
            };
            optionsbox.appendChild(button);
        }

        scene.on("change", newVal => {
            let button = document.querySelector(`paper-button#layout_${newVal}`);
            let activebutton = document.querySelector("paper-button.active");
            if(activebutton) {
                activebutton.className = "";
            }
            if(button) {
                button.className = "active";
            }
        });
    });

})();
