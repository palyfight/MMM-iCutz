Module.register("MMM-iCutz", {
    defaults: {
        streamUrl: "http://localhost:8082/",
        width: "640px",
        height: "480px"
    },

    start: function() {
        this.sendSocketNotification("START_STREAM", {
            streamUrl: this.config.streamUrl,
            videoDevice: "/dev/video0"
        });
    },

    stop: function() {
        this.sendSocketNotification("STOP_STREAM");
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        var image = document.createElement("img");
        image.style.width = this.config.width;
        image.style.height = this.config.height;
        image.src = `${this.config.streamUrl}?timestamp=${new Date().getTime()}`;
        wrapper.appendChild(image);
        return wrapper;
    }
});
