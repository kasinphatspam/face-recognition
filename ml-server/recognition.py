import os
import cv2
import numpy as np
import math
import datetime
import base64
from PIL import Image
import face_recognition
import time
from tensorflow import keras


class FaceRecognition:
    def __init__(self, package_key):
        self.package_key = package_key
        self.file_path = f"dataset/{package_key}.npy"

    @staticmethod
    def calculate_face_confidence(face_distance, face_match_threshold=0.6):
        range_val = 1.0 - face_match_threshold
        linear_val = (1.0 - face_distance) / (range_val * 2.0)

        if face_distance > face_match_threshold:
            return str(round(linear_val * 100, 2)) + "%"
        else:
            value = (
                linear_val
                + ((1.0 - linear_val) * math.pow((linear_val - 0.5) * 2, 0.2))
            ) * 100
            return str(round(value, 2)) + "%"

    def delete_image(self, encode_id):
        try:
            existing_face_data = np.load(self.file_path, allow_pickle=True)
            if (
                "encodings" in existing_face_data.item()
                and "ids" in existing_face_data.item()
            ):
                face_data = existing_face_data.item()
            else:
                return {"statusCode":-1,
                    "description":"Package (organization) is empty",}
        except (FileNotFoundError, ValueError):
            return {"statusCode":-1,
                    "desceiption":"Can't find the file package (organization)",}

        encodings = face_data["encodings"]
        ids = face_data["ids"]

        for i in range(len(ids)):
            if ids[i] == encode_id:
                break

        if i < len(ids):
            # Delete the corresponding encoding and ID
            encodings.pop(i)
            ids.pop(i)

            # Create a new package with the updated data
            new_package = {"encodings": encodings, "ids": ids}

            # Save the updated package back to the file
            np.save(self.file_path, new_package)
            return {"statusCode":1,
                    "description": "Image deleted successfully",}
        else:
            return {"statusCode":-1,
                    "description":"Encode ID not found in the package"}

    def encode(self, encoded_data):
        decoded_data = base64.b64decode(encoded_data)
        timestamp = int(time.time())
        img_path = f"data/{timestamp}.jpg"

        with open(img_path, "wb") as img_file:
            img_file.write(decoded_data)

        face_image = face_recognition.load_image_file(img_path)

        # Liveness Detection
        model = keras.models.load_model("face_spoof_model.h5")
        predictions = model.predict(np.expand_dims(face_image, axis=0))

        if predictions[0][0] < 0.86:
            liveness = False
        else:
            liveness = True

        if not face_recognition.face_encodings(face_image):
            for i in range(3):
                img = Image.open(img_path)
                img = img.rotate(90)
                img.save(img_path)

                face_image = face_recognition.load_image_file(img_path)

                if not face_recognition.face_encodings(face_image):
                    if i == 2:
                        os.unlink(img_path)
                        return{
                            "id": "FACE_NOT_FOUND",
                            "statusCode": -1,
                            "accuracy": 0,
                            "checkedTime": timestamp,
                        }
                else:
                    break

        face_encodings = face_recognition.face_encodings(face_image)

        try:
            existing_face_data = np.load(self.file_path, allow_pickle=True)
            if (
                "encodings" in existing_face_data.item()
                and "ids" in existing_face_data.item()
            ):
                face_data = existing_face_data.item()
            else:
                face_data = {"encodings": [], "ids": []}
        except (FileNotFoundError, ValueError):
            face_data = {"encodings": [], "ids": []}

        face_data["encodings"].append(face_encodings[0].tolist())
        face_data["ids"].append(timestamp)

        np.save(self.file_path, face_data)

        os.unlink(img_path)

        return {"encodedId": str(timestamp),
                "statusCode":1,
                "Liveness": liveness,}

    def recognition(self, encoded_data):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        file_size_id = os.path.getsize(self.file_path)


        if file_size_id == 0:
            print("ERROR in face-recognition system: dataset is empty.")
            return {
                "id": "ERROR",
                "statusCode": -1,
                "accuracy": 0,
                "checkedTime": timestamp,
            }

        try:
            face_data = np.load(self.file_path, allow_pickle=True).item()
        except (FileNotFoundError, ValueError):
            print("ERROR: Unable to load face data.")
            return {
                "id": "ERROR",
                "statusCode": -1,
                "accuracy": 0,
                "checkedTime": timestamp,
            }

        decoded_data = base64.b64decode(encoded_data)
        timestamp = int(time.time())
        img_path = f"api/{timestamp}.jpg"

        with open(img_path, "wb") as img_file:
            img_file.write(decoded_data)

        face_image = face_recognition.load_image_file(img_path)

        # Liveness Detection
        model = keras.models.load_model("face_spoof_model.h5")
        predictions = model.predict(np.expand_dims(face_image, axis=0))

        if predictions[0][0] < 0.86:
            liveness = False
        else:
            liveness = True

        if not face_recognition.face_encodings(face_image):
            for i in range(3):
                img = Image.open(img_path)
                img = img.rotate(90)
                img.save(img_path)

                face_image = face_recognition.load_image_file(img_path)

                if not face_recognition.face_encodings(face_image):
                    if i == 2:
                        os.unlink(img_path)
                        print(
                            {
                                "id": "FACE_NOT_FOUND",
                                "statusCode": -1,
                                "accuracy": 0,
                                "checkedTime": timestamp,
                            }
                        )
                        return {
                            "id": "FACE_NOT_FOUND",
                            "statusCode": -1,
                            "accuracy": 0,
                            "checkedTime": timestamp,
                        }
                else:
                    break

        os.unlink(img_path)

        small_frame = cv2.resize(face_image, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = np.ascontiguousarray(small_frame[:, :, ::-1])

        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(
            rgb_small_frame, face_locations
        )

        os.unlink(img_path)

        face_ids = []
        for face_encoding in face_encodings:
            face_distances = face_recognition.face_distance(
                face_data["encodings"], face_encoding
            )
            best_match_index = np.argmin(face_distances)
            if face_distances[best_match_index] <= 0.9:
                id = face_data["ids"][best_match_index]
                confidence = FaceRecognition.calculate_face_confidence(
                    face_distances[best_match_index]
                )
                percentage = float(confidence.replace("%", ""))
                if percentage > 80:
                    print(
                        {
                            "id": str(id),
                            "statusCode": 1,
                            "accuracy": percentage,
                            "checkedTime": timestamp,
                            "liveness":liveness,
                        }
                    )
                    return {
                        "id": str(id),
                        "statusCode": 1,
                        "accuracy": percentage,
                        "checkedTime": timestamp,
                        "liveness":liveness,
                    }

        print(
            {
                "id": "UNKNOWN_CUSTOMER",
                "statusCode": 0,
                "accuracy": 0,
                "checkedTime": timestamp,
                "liveness":liveness,
            }
        )
        return {
            "id": "UNKNOWN_CUSTOMER",
            "statusCode": 0,
            "accuracy": 0,
            "checkedTime": timestamp,
            "liveness":liveness,
        }
