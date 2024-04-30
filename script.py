import os
import glob
from picamera import PiCamera
from time import sleep
import datetime
import cv2

def cleanup_old_images(max_images=10):
    """Keep only the latest max_images files."""
    files = sorted(glob.glob('modules/MMM-iCutz/public/*.jpg'))
    if len(files) > max_images:
        for f in files[:-max_images]:
            os.remove(f)

camera = PiCamera()
camera.resolution = (1920, 1080)  # Set resolution tuple

# Load OpenCV's pre-trained Haar cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

try:
    camera.start_preview()
    while True:
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        image_path = f'modules/MMM-iCutz/public/{timestamp}.jpg'
        camera.capture("temporary.jpg")  # Capture image

        # Read the image and convert to grayscale for face detection
        img = cv2.imread("temporary.jpg")
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Detect faces in the image
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        # Draw rectangles around each face
        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

        # Save the modified image
        cv2.imwrite(image_path, img)

        # Clean up and sleep
        cleanup_old_images(10)  # Adjust the number based on your preference
        sleep(5)  # Update interval
finally:
    camera.stop_preview()
    camera.close()
