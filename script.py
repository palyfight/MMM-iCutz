import os
import glob
from picamera import PiCamera
from time import sleep
import datetime

def cleanup_old_images(max_images=50):
    """Keep only the latest max_images files."""
    files = sorted(glob.glob('modules/MMM-iCutz/public/*.jpg'))
    if len(files) > max_images:
        for f in files[:-max_images]:
            os.remove(f)

camera = PiCamera()
camera.resolution = (1920, 1080)  # Set resolution tuple

try:
    camera.start_preview()
    while True:
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        image_path = f'modules/MMM-iCutz/public/{timestamp}.jpg'
        camera.capture(image_path)

        print(image_path, flush=True)  # Ensure the output is flushed immediately

        # Clean up and sleep
        cleanup_old_images(10)  # Adjust the number based on your preference
        sleep(5)  # Update interval
finally:
    camera.stop_preview()
    camera.close()
