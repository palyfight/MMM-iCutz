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
        this.pyShell.stdout.on('data', (data) => {
            console.log("Python script output:", data.toString());
        });
        this.pyShell.stderr.on('data', (data) => {
            console.error("Python script error:", data.toString());
        });
        this.pyShell.on('close', (code) => {
            console.log(`Python script stopped with code ${code}`);
            this.pythonStarted = false;
        });
    }
});
