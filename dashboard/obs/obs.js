/* global nodecg */
let setup = function setup(argument) {
    let connection = document.querySelector("span#connection"),
        reconnect = document.querySelector("paper-button#reconnect"),
        status = nodecg.Replicant("obs-connection", { defaultValue: false });

    if(!nodecg.bundleConfig.use.obs) {
    	reconnect.innerText = "Not connected";
    	reconnect.disabled = true;
    }

    status.on("change", newVal => {
    	if(newVal) {
    		reconnect.innerText = "Reconnect";
    	} else {
    		reconnect.innerText = "Connecting...";
    	}
    });

    reconnect.onclick = function() {
        nodecg.sendMessage("obs-reconnect");
    };

    connection.innerText = nodecg.bundleConfig.obs.url;

};
document.addEventListener("DOMContentLoaded", setup);
