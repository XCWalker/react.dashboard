export function reactRadioPlayPause() {
    const url = "https://simulatorradio.stream/320"

    if (document.documentElement.dataset.radioPlayState === "paused" || document.documentElement.dataset.radioPlayState === undefined) {
        document.documentElement.dataset.radioPlayState = "playing";

        document.querySelector("audio#radio").src = url;
        document.querySelector("audio#radio").play();
        return
    }

    if (document.documentElement.dataset.radioPlayState === "playing") {
        document.documentElement.dataset.radioPlayState = "paused";

        document.querySelector("audio#radio").src = "";
        return
    }
}