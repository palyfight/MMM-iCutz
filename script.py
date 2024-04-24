from picamera import PiCamera
from time import sleep
import datetime

camera = PiCamera()
camera.resolution = (640, 480)

try:
    camera.start_preview()
    while True:
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        camera.capture(f'/home/pi/MagicMirror/modules/MMM-iCutz/public/{timestamp}.jpg')
        sleep(5)  # Update interval
finally:
    camera.stop_preview()
    camera.close()
