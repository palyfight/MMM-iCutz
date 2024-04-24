# MMM-iCutz

This module displays a camera feed, from a PiCamera, on the Magic Mirror.

## Dependencies

- python3 (should come by default with Raspian OS)
- ffmpeg

```
sudo apt-get update
sudo apt-get install ffmpeg
```

## How to use

Add the following to your **config/config.js**

```
{
    module: "MMM-iCutz",
    position: "middle_center"
},
```

## What it looks like

![image info](screen_capture.jpg)
