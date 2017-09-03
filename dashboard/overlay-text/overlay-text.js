/* global nodecg */
let setup = function setup() {
    let input = document.querySelector("paper-input#input"),
        btn = document.querySelector("paper-button#take"),
        rep = nodecg.Replicant("overlay-text", { defaultValue: "KarenDoesThings" }),
        placeholder = "memes?";

    rep.on("change", function(newVal) {
        input.value = newVal;
        placeholder =  newVal;
    });

    input.oninput = function(e) {
        btn.disabled = e.target.value.trim() === "";
    };

    btn.onclick = function() {
        if(input.value.trim() == placeholder) return;
        rep.value = input.value.trim();
    };
};
document.addEventListener("DOMContentLoaded", setup);