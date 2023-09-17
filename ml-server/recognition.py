import random
import string
import os
import cv2
import numpy as np
import math
import datetime
import base64
from PIL import Image
import face_recognition
import time

# Running
def run(package_key, image):
    fr = FaceRecognition(package_key)
    return fr.recognition(image)

def encode(package_key, image):
    fr = FaceRecognition(package_key)
    return fr.encode(image)

#if face confident not working, bring it out of the class
#put this code when finished create file
    # face_data = {"encodings": [], "ids": []}
    # np.save("./dataset/tester.npy", face_data)
class FaceRecognition:
    def __init__(self, packageKey):
        # Initialize variable for encoding image
        self.file_path = "dataset/" + packageKey + ".npy"
        self.face_data = {"encodings": [], "ids": []}
        # self.file_path = {"./dataset/tester.npy"}

    @staticmethod
    def face_confidence(face_distance, face_match_threshold=0.6):
        range_val = 1.0 - face_match_threshold
        linear_val = (1.0 - face_distance) / (range_val * 2.0)

        if face_distance > face_match_threshold:
            return str(round(linear_val * 100, 2)) + "%"
        else:
            value = (
                linear_val + ((1.0 - linear_val) * math.pow((linear_val - 0.5) * 2, 0.2))
            ) * 100
            return str(round(value, 2)) + "%"

    def deleteimage(self, encode_id):
        # Load the encoded images and IDs from file paths.
        encoded_image = np.load(self.file_path_image, allow_pickle=True)
        encoded_id = np.load(self.file_path_id, allow_pickle=True)

        # Iterate through the IDs to find the index of the user to be deleted.
        for i in range(len(encoded_id)):
            if encoded_id[i] == encode_id:
                break  # Stop the loop when the user ID is found.

        # Delete the corresponding image and ID from the arrays.
        encoded_image = np.delete(encoded_image, i, axis=0)
        encoded_id = np.delete(encoded_id, i, axis=0)

        # Save the updated arrays back to their respective files.
        np.save(self.file_path_image, encoded_image)
        np.save(self.file_path_id, encoded_id)


    def encode(self, encoded_data):
        # Decode base64 string data
        decoded_data = base64.b64decode(encoded_data)

        # Getting the timestamp
        ts = time.time()

        # Write the decoded data back to the original format in a file
        img_file = open(f"./data/{ts}.jpg", "wb")
        img_file.write(decoded_data)
        img_file.close()

        face_image = face_recognition.load_image_file(f"data/{ts}.jpg")

        if len(face_recognition.face_encodings(face_image)) <= 0:
            # Rotate the image to process
            img = Image.open(f"./data/{ts}.jpg")

            # Analyze the image on each axis in case the image is rotated
            for i in range(3):
                img = img.rotate(90)
                img.save(f"./data/{ts}.jpg")

                # Initialize variables for scaling and recognition
                face_image = face_recognition.load_image_file(f"data/{ts}.jpg")
                if len(face_recognition.face_encodings(face_image)) <= 0:
                    # Returns this function when there are no faces in the image.
                    if i == 2:
                        # Delete image file
                        os.unlink(f"./data/{ts}.jpg")
                        return -1
                    continue
                else:
                    break

        face_encodings = face_recognition.face_encodings(face_image)

        # Load existing face data if available
        try:
            existing_face_data = np.load("./dataset/tester.npy", allow_pickle=True)
            if existing_face_data.size > 0:
                face_data = existing_face_data.tolist()
            else:
                face_data = {"encodings": [], "ids": []}
        except (FileNotFoundError, ValueError):
            # If the file doesn't exist or is empty, initialize an empty data dictionary
            face_data = {"encodings": [], "ids": []}

        # Add the face encoding and ID to the data dictionary
        face_data["encodings"].append(face_encodings[0].tolist())
        face_data["ids"].append(ts)

        np.save("./dataset/tester.npy", face_data)

        # Delete image file
        os.unlink(f"./data/{ts}.jpg")

        return str(ts)
    
    def recognition(self, encoded_data): 
        # Check if the file is empty
        file_size_id = os.path.getsize("./dataset/tester.npy")
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        if file_size_id == 0:
            print("ERROR in face-recognition system: dataset is empty.")
            return { "id": "ERROR","statusCode": -1, "accuracy": 0, "checkedTime": timestamp}
        
        # Load the encoded face data and IDs from the single .npy file
        try:
            face_data = np.load("./dataset/tester.npy", allow_pickle=True).item()
        except (FileNotFoundError, ValueError):
            print("ERROR: Unable to load face data.")
            return { "id": "ERROR","statusCode": -1, "accuracy": 0, "checkedTime": timestamp}

        # Decode base64 string data
        decoded_data = base64.b64decode(encoded_data)

        # Getting the timestamp
        ts = time.time()

        # Write the decoded data back to the original format in a file
        img_file = open(f"./api/{ts}.jpg", "wb")
        img_file.write(decoded_data)
        img_file.close()

        face_image = face_recognition.load_image_file(f"api/{ts}.jpg")

        if len(face_recognition.face_encodings(face_image)) > 0:
            frame = face_image
        else:
            # Rotate the image to process
            img = Image.open(f"./api/{ts}.jpg")

            # Analyze the image on each axis in case the image is rotated
            for i in range(3):
                img = img.rotate(90)
                img.save(f"./api/{ts}.jpg")

                # Initialize variables for scaling and recognition
                face_image = face_recognition.load_image_file(f"api/{ts}.jpg")
                if len(face_recognition.face_encodings(face_image)) <= 0:
                    # Returns this function when there are no faces in the image.
                    if i == 2:
                        # Delete image file
                        os.unlink(f"./api/{ts}.jpg")
                        print({ "id": "FACE_NOT_FOUND", "statusCode": -1, "accuracy": "0", "checkedTime": timestamp })
                        return { "id": "FACE_NOT_FOUND", "statusCode": -1, "accuracy": 0, "checkedTime": timestamp }
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
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(
            rgb_small_frame, face_locations
        )

        # Delete image file
        os.unlink(f"./api/{ts}.jpg")

        # Initialize variables
        face_ids = []
        for face_encoding in face_encodings:     
            # Compare distance between the given image and dataset image
            face_distances = face_recognition.face_distance(
                face_data["encodings"], face_encoding
            )
            best_match_index = np.argmin(face_distances)
            if face_distances[best_match_index] <= 0.9:
                id = face_data["ids"][best_match_index]
                # Convert face confidence value to percentage
                confidence = FaceRecognition.face_confidence(face_distances[best_match_index])
                percentage = float(confidence.replace("%",""))
                # Check the condition, the displayed percentage must be greater than 90 percent, 
                # the program will return the customer's id.
                if percentage > 80:
                    print({ "id": str(id), "statusCode": 1, "accuracy": percentage, "checkedTime": timestamp })
                    return { "id": str(id), "statusCode": 1, "accuracy": percentage, "checkedTime": timestamp }

            # This result will return when not all datasets match the given image
            print( { "id": "UNKNOWN_CUSTOMER","statusCode": 0, "accuracy": 0, "checkedTime": timestamp})
            return { "id": "UNKNOWN_CUSTOMER","statusCode": 0, "accuracy": 0, "checkedTime": timestamp}
