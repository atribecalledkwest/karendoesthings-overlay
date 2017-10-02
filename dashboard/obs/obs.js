/* global nodecg */
let setup = function setup(argument) {
    let connection = document.querySelector("span#connection"),
        reconnect = document.querySelector("paper-button#reconnect"),
        status = nodecg.Replicant("obs-connection", { defaultValue: false });

    status.on("change", newVal => {
        reconnect.disabled = !newVal;
    });

    reconnect.onclick = function() {
        nodecg.sendMessage("obs-reconnect");
    };

};
document.addEventListener("DOMContentLoaded", setup);