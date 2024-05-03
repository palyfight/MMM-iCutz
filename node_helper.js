const NodeHelper = require('node_helper');
const { spawn } = require('child_process');

module.exports = NodeHelper.create({
    start: function() {
        console.log('MMM-iCutz helper started...');
        this.pythonStarted = false;
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "START_CAMERA" && !this.pythonStarted) {
            this.pythonStarted = true;
            this.startCameraScript();
        }
    },

    startCameraScript: function() {
        const scriptPath = 'modules/MMM-iCutz/script.py';
        this.pyShell = spawn('python3', [scriptPath]);

        // Collect data chunks and process each line as it comes
        let buffer = '';
        this.pyShell.stdout.on('data', (data) => {
            buffer += data.toString();
            let lines = buffer.split('\n');
            buffer = lines.pop();  // Keep the last partial line in the buffer

            // Process each complete line
            lines.forEach(line => {
                if (line.trim()) {
                    console.log("Python script output:", line);
                    this.sendSocketNotification("IMAGE_CAPTURED", line.trim());
                }
            });
        });

        this.pyShell.stderr.on('data', (data) => {
            console.error("Python script error:", data.toString());
        });

        this.pyShell.on('close', (code) => {
            if (buffer) { // Process any remaining data in the buffer
                console.log("Python script output:", buffer);
                this.sendSocketNotification("IMAGE_CAPTURED", buffer.trim());
            }
            console.log(`Python script stopped with code ${code}`);
            this.pythonStarted = false;
        });
    }
});
