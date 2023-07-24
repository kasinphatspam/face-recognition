import face_recognition
import time
import os, sys
import cv2
import numpy as np
import math
import datetime
import base64
from PIL import Image

# Running
def run(image,camera_side):
    fr = FaceRecognition()
    return fr.recognition(image,camera_side)

# Helper
def face_confidence(face_distance, face_match_threshold=0.6):
    range = 1.0 - face_match_threshold
    linear_val = (1.0 - face_distance) / (range * 2.0)

    if face_distance > face_match_threshold:
        return str(round(linear_val * 100, 2)) + "%"
    else:
        value = (
            linear_val + ((1.0 - linear_val) * math.pow((linear_val - 0.5) * 2, 0.2))
        ) * 100
        return str(round(value, 2)) + "%"

class FaceRecognition:
    # Initialize variable for encoding image
    file_path_image = "encodedimage.npy"
    file_path_name = "encodedname.npy"
    face_locations = []
    face_encodings = []
    face_names = []

    # Check if the file is empty
    file_size_name = os.path.getsize(file_path_name)
    if file_size_name == 0:
        print("ERROR in face-recognition system: dataset is empty.")
    else:
        # Import encoded image from encoded.npy
        known_face_encodings = np.load(file_path_image)
        known_face_encodings = np.array(known_face_encodings, dtype=np.float64)
        known_face_names = np.load(file_path_name)
        known_face_names = np.array(known_face_names)

    def recognition(self, encoded_data, camera_side):

        # Decode base64 string data
        decoded_data = base64.b64decode((encoded_data))

        # Getting the timestamp
        ts = time.time()

        # Write the decoded data back to original format in  file
        img_file = open(f"./api/{ts}.png", "wb")
        img_file.write(decoded_data)
        img_file.close()

        # Rotate the image to process
        img = Image.open(f"./api/{ts}.png")
        if camera_side == 'DEFAULT_FRONT_CAMERA':
            img = img.rotate(90)
        elif camera_side == 'DEFAULT_BACK_CAMERA':
            img = img.rotate(270)
        img.save(f"./api/{ts}.png")
        
        # Check if the file is empty
        if len(os.listdir("./api")) == 0:
            return { "name": "MISSING_FILE_IN DATASET_FOLDER", "accuracy": "0", "timestamp": "0"}
        
        # Initialize variables for scaling and recognition
        buffer = []
        face_image = face_recognition.load_image_file(f"api/{ts}.png")
        frame = face_image

        # Encrypt the image to check if there is a face in the image
        if len(face_recognition.face_encodings(face_image)) <= 0:
            # Delete image file
            os.unlink(f"./api/{ts}.png")
            return { "name": "FACE_NOT_FOUND", "accuracy": "0", "timestamp": "0"}
        
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(
            frame, (0, 0), fx=0.25, fy=0.25
        )  # Adjust the scaling factor as needed

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = np.ascontiguousarray(small_frame[:, :, ::-1])

        # Find all the faces and face encodings in the current frame of video
        self.face_locations = face_recognition.face_locations(rgb_small_frame)
        self.face_encodings = face_recognition.face_encodings(
            rgb_small_frame, self.face_locations
        )

        # Delete image file
        os.unlink(f"./api/{ts}.png")

        # Finds all faces whose index best matches the given image
        self.face_names = []
        for face_encoding in self.face_encodings:
            
            # Compare distance between the given image and dataset image
            face_distances = face_recognition.face_distance(
                self.known_face_encodings, face_encoding
            )
            best_match_index = np.argmin(face_distances)
            if face_distances[best_match_index] <= 0.9:
                name = self.known_face_names[best_match_index]
                # Convert face confidence value to percentage
                confidence = face_confidence(face_distances[best_match_index])
                percentage = float(confidence.replace("%",""))
                # Check the condition, the displayed percentage must be greater than 90 percent, 
                # the program will return the customer's id.
                if(percentage > 90):
                    timestamp = datetime.datetime.now()
                    # Remove the suffix in the file name
                    name = str(name.replace(".jpg",""))
                    print({ "name": name, "accuracy": percentage, "timestamp": timestamp})
                    return { "name": name, "accuracy": percentage, "timestamp": str(timestamp)}

        # This result will return when not all datasets match the given image
        return { "name": "UNKNOWN_CUSTOMER", "accuracy": "0", "timestamp": "0"}