/* global nodecg */
let setup = function setup() {
    let rep = nodecg.Replicant("enable-now-playing", { defaultValue: true }),
        np = nodecg.Replicant("nowplaying"),
        checkbox = document.querySelector("paper-checkbox#enablenowplaying"),
        btn = document.querySelector("paper-button#test"),
        artist = document.querySelector("span#artist"),
        song = document.querySelector("span#song");

    checkbox.onchange = function(e) {
        rep.value = e.target.checked;
    };

    btn.onclick = function() {
        if(np.value) {
            nodecg.sendMessage("nowplaying", np.value);
        } else {
            nodecg.sendMessage("nowplaying", {
                artist: "Chillindude829",
                song: "Respect Your Elders"
            });
        }
    };

    rep.on("change", function(newVal) {
        checkbox.checked = newVal;
        btn.disabled = !newVal;
    });

    np.on("change", function(track) {
        artist.innerText = track.artist;
        song.innerText = track.song;
    });

    if(!nodecg.bundleConfig.debug) {
        let tests = document.querySelector("div#tests");
        tests.style.display = "none";
    }
};
document.addEventListener("DOMContentLoaded", setup);