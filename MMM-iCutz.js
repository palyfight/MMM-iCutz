Module.register("MMM-iCutz", {
    defaults: {},

    start: function() {
        this.sendSocketNotification("START_CAMERA", {});
        console.log("Requested to start camera...");
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        var image = document.createElement("img");
        image.style.width = "100%";
        var date = new Date();
        // Format the image URL to match your script's output
        var imagePath = `/home/ntwali/MagicMirror/modules/MMM-iCutz/public/${this.fileDate()}.jpg`;
        image.src = imagePath;
        wrapper.appendChild(image);
        return wrapper;
    },

    fileDate: function() {
        var date = new Date();
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.toISOString().replace(/[-:]/g, "").slice(0, 14);
    }
});
