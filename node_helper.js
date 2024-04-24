var NodeHelper = require("node_helper");
const { spawn } = require("child_process");

module.exports = NodeHelper.create({
    start: function() {
        console.log("MMM-iCutz helper started...");
    },

    // Handle start and stop messages from the module
    socketNotificationReceived: function(notification, payload) {
        if (notification === "START_STREAM") {
            this.startStream(payload);
        } else if (notification === "STOP_STREAM") {
            this.stopStream();
        }
    },

    startStream: function(config) {
        if (this.streamProcess) {
            console.log("Stream already started.");
            return;
        }

        console.log("Starting camera stream...");
        // Build the ffmpeg command from the config or use defaults
        var streamUrl = config.streamUrl || "http://localhost:8082/feed.ffm";
        var videoDevice = config.videoDevice || "/dev/video0";

        this.streamProcess = spawn("ffmpeg", [
            "-f", "video4linux2",
            "-i", videoDevice,
            "-f", "mjpeg",
            "-q:v", "5",
            streamUrl
        ]);

        this.streamProcess.stdout.on("data", (data) => {
            console.log(`Stream: ${data}`);
        });

        this.streamProcess.stderr.on("data", (data) => {
            console.error(`Stream Error: ${data}`);
        });

        this.streamProcess.on("close", (code) => {
            console.log(`Stream process exited with code ${code}`);
            this.streamProcess = null;
        });
    },

    stopStream: function() {
        if (this.streamProcess) {
            this.streamProcess.kill('SIGINT');
            this.streamProcess = null;
            console.log("Camera stream stopped.");
        } else {
            console.log("No stream to stop.");
        }
    }
});
