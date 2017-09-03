/* global nodecg */
const toggleReplicants = {};
let toggleReplicant = function toggleReplicant(e) {
    let rep = nodecg.Replicant(e.target.id, { defaultValue: true });
    rep.value = e.target.checked;
};
let setup = function setup() {
    let checkboxes = document.querySelectorAll("paper-checkbox");
    for(let i = 0; i < checkboxes.length; i++) {
        let item = checkboxes[i];
        let rep = nodecg.Replicant(item.id, { defaultValue: true });
        rep.on("change", function(newVal) {
            item.checked = newVal;
        });
        item.onchange = toggleReplicant;
        toggleReplicants[item.id] = rep;
        // Check if there's a button for testing this item
        if(typeof item.dataset.triggers !== "undefined") {
            rep.on("change", function(newVal) {
                let btn = document.querySelector(`paper-button#${item.dataset.triggers}`);
                btn.disabled = !newVal;
            });
        }
    }
    let testfollow = document.querySelector("paper-button#follow"),
        testbits = document.querySelector("paper-button#bits"),
        testdonations = document.querySelector("paper-button#donation"),
        testsubscription = document.querySelector("paper-button#subscription");
    testfollow.onclick = function() {
        nodecg.sendMessage("follow", {
            user: {
                display_name: "KarenDoesThings",
                name: "karendoesthings"
            }
        });
    };
    testbits.onclick = function() {
        nodecg.sendMessage("bits", {
            username: "karendoesthings",
            bits: Math.round(Math.random() * 1000)
        });
    };
    testdonations.onclick = function() {
        nodecg.sendMessage("donation", {
            currencySymbol: "$",
            amount: "4.20",
            username: "KarenDoesThings"
        });
    };
    testsubscription.onclick = function() {
        nodecg.sendMessage("subscription", {
            username: "karendoesthings",
            months: Math.random() > 0.5 ? 1 : Math.ceil(Math.random() * 10)
        });
    };

    if(!nodecg.bundleConfig.debug) {
        let tests = document.querySelector("div#tests");
        tests.style.display = "none";
    }
};
document.addEventListener("DOMContentLoaded", setup);