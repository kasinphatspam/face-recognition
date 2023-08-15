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
def run(image):
    fr = FaceRecognition()
    return fr.recognition(image)

def encode(image):
    fr = FaceRecognition()
    return fr.encode(image)

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
    file_path_id = "encodedid.npy"
    face_locations = []
    face_encodings = []
    face_ids = []

    def encode(self, encoded_data):
        # Decode base64 string data
        decoded_data = base64.b64decode((encoded_data))

         # Getting the timestamp
        ts = time.time()

        # Write the decoded data back to original format in  file
        img_file = open(f"./data/{ts}.jpg", "wb")
        img_file.write(decoded_data)
        img_file.close()

        face_image = face_recognition.load_image_file(f"data/{ts}.jpg")

        if len(face_recognition.face_encodings(face_image)) <= 0:
            return None
        
        face_encodings = face_recognition.face_encodings(face_image)

        # check that is it first time for encoding ?
        if os.path.getsize(self.file_path_image) == 0:
            known_face_encodings = np.empty((0, 128))
            face_ids = []
        else:
            known_face_encodings = np.load(self.file_path_image)
            face_ids = np.load(self.file_path_id)

        known_face_encodings = np.concatenate((known_face_encodings, [face_encodings[0]]), axis=0)
        face_ids = np.concatenate((face_ids, [ts]),axis=0)

        np.save(self.file_path_image, known_face_encodings)
        np.save(self.file_path_id, face_ids)

        # Delete image file
        os.unlink(f"./data/{ts}.jpg")
        
        return str(ts)
    
    # StatusCode
    # -1: ERROR (Empty dataset, No face detected on the image)
    #  0: Unknown
    #  1: Success it will return id

    def recognition(self, encoded_data): 
        # Check if the file is empty
        file_size_id = os.path.getsize(self.file_path_id)
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        if file_size_id == 0:
            print("ERROR in face-recognition system: dataset is empty.")
            return { "id": "ERROR","statusCode": -1, "accuracy": 0, "checkedTime": timestamp}
        else:
            # Import encoded image from encoded.npy
            known_face_encodings = np.load(self.file_path_image)
            known_face_encodings = np.array(known_face_encodings, dtype=np.float64)
            known_face_id = np.load(self.file_path_id)
            known_face_id = np.array(known_face_id)

        # Decode base64 string data
        decoded_data = base64.b64decode((encoded_data))

        # Getting the timestamp
        ts = time.time()

        # Write the decoded data back to original format in  file
        img_file = open(f"./api/{ts}.jpg", "wb")
        img_file.write(decoded_data)
        img_file.close()

        face_image = face_recognition.load_image_file(f"api/{ts}.jpg")

        if len(face_recognition.face_encodings(face_image)) > 0:
            frame = face_image
        else:
            # Rotate the image to process
            img = Image.open(f"./api/{ts}.jpg")

            # Analyze the image on each axis in case that the image is rotated
            for i in range(3):
                img = img.rotate(90)
                img.save(f"./api/{ts}.jpg")

                # Initialize variables for scaling and recognition
                face_image = face_recognition.load_image_file(f"api/{ts}.jpg")
                if len(face_recognition.face_encodings(face_image)) <= 0:
                    # Returns this function when there are no faces in the image.
                    if(i == 2):
                        # Delete image file
                        os.unlink(f"./api/{ts}.jpg")
                        print({ "id": "FACE_NOT_FOUND","statusCode": -1, "accuracy": "0", "checkedTime": timestamp})
                        return { "id": "FACE_NOT_FOUND","statusCode": -1, "accuracy": 0, "checkedTime": timestamp}
                    continue
                else:
                    frame = face_image
                    break
        
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
        os.unlink(f"./api/{ts}.jpg")

        # Finds all faces whose index best matches the given image
        self.face_ids = []
        for face_encoding in self.face_encodings:
            
            # Compare distance between the given image and dataset image
            face_distances = face_recognition.face_distance(
                known_face_encodings, face_encoding
            )
            best_match_index = np.argmin(face_distances)
            if face_distances[best_match_index] <= 0.9:
                id = known_face_id[best_match_index]
                # Convert face confidence value to percentage
                confidence = face_confidence(face_distances[best_match_index])
                percentage = float(confidence.replace("%",""))
                # Check the condition, the displayed percentage must be greater than 90 percent, 
                # the program will return the customer's id.
                if(percentage > 80):
                    print({ "id": str(id), "statusCode": 1, "accuracy": percentage, "checkedTime": timestamp})
                    return { "id": str(id), "statusCode": 1, "accuracy": percentage, "checkedTime": timestamp}

        # This result will return when not all datasets match the given image
        print( { "id": "UNKNOWN_CUSTOMER","statusCode": 0, "accuracy": 0, "checkedTime": timestamp})
        return { "id": "UNKNOWN_CUSTOMER","statusCode": 0, "accuracy": 0, "checkedTime": timestamp}