import os
import glob
from picamera import PiCamera
from time import sleep
import datetime

def cleanup_old_images(max_images=10):
    """Keep only the latest max_images files."""
    files = sorted(glob.glob('modules/MMM-iCutz/public/*.jpg'))
    if len(files) > max_images:
        for f in files[:-max_images]:
            os.remove(f)

def capture_image():
    """Captures an image using the PiCamera and returns the file path."""
    with PiCamera() as camera:
        camera.resolution = (1920, 1080)  # Set resolution tuple
        camera.start_preview()
        # Allow camera to warm up
        sleep(2)
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        image_path = f'modules/MMM-iCutz/public/{timestamp}.jpg'
        camera.capture(image_path)
        camera.stop_preview()
    
    cleanup_old_images(10)  # Clean up old images
    return image_path

if __name__ == "__main__":
    # The function call and the result (image path) can be printed or handled otherwise
    path = capture_image()
    print(path)  # This print can be used by node_helper.js to read the path
