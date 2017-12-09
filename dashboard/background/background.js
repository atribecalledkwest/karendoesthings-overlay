/* global nodecg */
(function() {
    "use strict";
    let layouts = [
        "16x9",
        "4x3",
        "40x33",
        "5x3",
        "starting",
        "brb",
        "none",
        "16x9_webcam_rect",
        "16x9_webcam_square",
        "4x3_webcam"
    ];

    let scene = nodecg.Replicant("obs-scene", { defaultValue: "brb" });

    for(let i = 0; i < layouts.length; i++) {
        let item = layouts[i];
        let button = document.querySelector(`paper-button#layout_${item}`);
        button.onclick = function() {
            scene.value = item;
            nodecg.sendMessage("obs-scenechange", item);
        };
    }

    scene.on("change", newVal => {
        let button = document.querySelector(`paper-button#layout_${newVal}`);
        let activebutton = document.querySelector("paper-button.active");
        if(activebutton) {
            activebutton.className = "";
        }
        button.className = "active";
    });

})();
