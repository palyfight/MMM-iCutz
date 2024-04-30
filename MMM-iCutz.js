Module.register("MMM-iCutz", {
    defaults: {},

    start: function() {
        this.sendSocketNotification("START_CAMERA", {});
        console.log("Requested to start camera...");
    },

    getStyles: function() {
        return ["MMM-iCutz.css"]; // Include the CSS file here
    },

    getDom: function() {
        var nunjucks = require('nunjucks');
        nunjucks.configure({ autoescape: true });
        var renderedHtml = nunjucks.render('MMM-iCutz.njk', { fileDate: this.fileDate() });

        var wrapper = document.createElement('div');
        wrapper.innerHTML = renderedHtml;
        return wrapper.firstChild;
    },

    // getDom: function() {
    //     var wrapper = document.createElement("div");
    //     wrapper.className = "MMM-iCutz"; // class for styling
    //     var image = document.createElement("img");
    //     image.style.width = "100%";
    //     var date = new Date();
    //     // Format the image URL to match script's output
    //     var imagePath = `modules/MMM-iCutz/public/${this.fileDate()}.jpg`;
    //     image.src = imagePath;
    //     wrapper.appendChild(image);
    //     return wrapper;
    // },

    fileDate: function() {
        var date = new Date();
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.toISOString().replace(/[-:]/g, "").slice(0, 14);
    }
});
