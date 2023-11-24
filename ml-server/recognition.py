import os
import cv2
import numpy as np
import math
import datetime
import base64
from PIL import Image
import face_recognition
import time
import io

class FaceRecognition:
    def __init__(self, package_key):
        self.package_key = package_key
        self.file_path = f"dataset/{package_key}.npy"
        self.organ_empty = "dataset/empty_organization_for_check_empty.npy"
        self.face_data = self.load_organization_data()

    def load_organization_data(self):
        if os.path.exists(self.file_path):
            try:
                return np.load(self.file_path, allow_pickle=True).item()
            except (FileNotFoundError, ValueError):
                print("ERROR: Unable to load organization.")
        return None
    

    def calculate_face_confidence(self,face_distance, face_match_threshold=0.6):
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

    # return 1 = it's the same file
    # return 0 = it's diffrent file
    # return -1 = File not found
    def load_and_compare_files(self,file1, file2):
        try:
            data1 = np.load(file1, allow_pickle=True).item()
            data2 = np.load(file2, allow_pickle=True).item()
            if data1 == data2:
                return 1
            else:
                return 0
        except FileNotFoundError:
            return -1
            
    def delete_image(self, encode_id):
        try:
            # Check if organization is empty
            if self.load_and_compare_files(self.file_path, self.organ_empty) == 1:
                # Case 2: PASS Organization is empty
                return {
                    "statusCode": -1,
                    "message": "FAIL: Organization is empty",
                }

            data = np.load(self.file_path, allow_pickle=True).item()
            encodings = data.get("encodings", [])
            ids = data.get("ids", [])

            # Find the index of the encode_id in the ids list
            try:
                encode_id = int(encode_id)
                index = ids.index(encode_id)
                # Remove the encoding and id at the found index
                del encodings[index]
                del ids[index]

                # Update the data dictionary
                data["encodings"] = encodings
                data["ids"] = ids

                # Save the updated data to the file
                np.save(self.file_path, data)

                # Case 1: PASS Success
                return {
                    "statusCode": 1,
                    "message": f"PASS: Successfully deleted ID: {encode_id}",
                }
            except ValueError:
                # Case 4: Encode id not found in organization
                return {
                    "statusCode": 0,
                    "message": f"FAIL: ID: {encode_id} not found in organization",
                }
        except FileNotFoundError:
            # Case 3: PASS Organization not found
            return {
                "statusCode": -1,
                "message": "FAIL: Organization not found",
            }
        except Exception as e:
            # Case 5: Error during deletion
            return {
                "statusCode": -1,
                "message": f"FAIL: Error deleting encoding: {str(e)}",
            }

    def encode(self, encoded_data):
        decoded_data = base64.b64decode(encoded_data)
        timestamp = int(time.time())
        current_time = time.time()
        img_path = f"data/{timestamp}.jpg"

        with open(img_path, "wb") as img_file:
            img_file.write(decoded_data)

        face_image = face_recognition.load_image_file(img_path)

        if not face_recognition.face_encodings(face_image):
            for i in range(3):
                img = Image.open(img_path)
                img = img.rotate(90)
                img.save(img_path)

                face_image = face_recognition.load_image_file(img_path)

                if not face_recognition.face_encodings(face_image):
                    if i == 2:
                        os.unlink(img_path)
                        print("Not found face in image")
                        return{
                            "statusCode": -1,
                            "checkedTime": current_time,
                            "message":"FAIL: Not found face on image"
                        }
                else:
                    break

        face_encodings = face_recognition.face_encodings(face_image)

        if os.path.exists(self.file_path):
            pass
        else:
            print("ERROR: Organization not found")
            return {
                "statusCode":-1,
                "checkedTime": current_time,
                "message": "FAIL: Oganization not found",
            }
        
        try:
            existing_face_data = np.load(self.file_path, allow_pickle=True)
            if (
                "encodings" in existing_face_data.item()
                and "ids" in existing_face_data.item()
            ):
                face_data = existing_face_data.item()
                del existing_face_data
            else:
                pass
        except (FileNotFoundError, ValueError):
            print("ERROR: Unable to load organization.")
            return {
                "statusCode": -1,
                "checkedTime": current_time,
                "message": "FAIL: Unable to load organization",
            }

        face_data["encodings"].append(face_encodings[0].tolist())
        face_data["ids"].append(timestamp)

        np.save(self.file_path, face_data)

        os.unlink(img_path)

        return {"encodedId": str(timestamp),
                "checkedTime": current_time,
                "statusCode":1,
                "message":"PASS: Encode Sucess"}

    # Testing 2 : remove save and load part
    def encode_file(self, image):
        timestamp = int(time.time())
        current_time = time.time()
        face_image = face_recognition.load_image_file(image)

        if not face_recognition.face_encodings(face_image):
            print("Not found face in image")
            return {
                "statusCode": -1,
                "checkedTime": timestamp,
                "message": "FAIL: Not found face on image",
            }

        face_encodings = face_recognition.face_encodings(face_image)

        if os.path.exists(self.file_path):
            pass
        else:
            print("ERROR: Organization not found")
            return {
                "statusCode": -1,
                "checkedTime": current_time,
                "message": "FAIL: Oganization not found",
            }

        try:
            existing_face_data = np.load(self.file_path, allow_pickle=True)
            if "encodings" in existing_face_data.item() and "ids" in existing_face_data.item():
                face_data = existing_face_data.item()
                del existing_face_data
            else:
                pass
        except (FileNotFoundError, ValueError):
            print("ERROR: Unable to load organization.")
            return {
                "statusCode": -1,
                "checkedTime": current_time,
                "message": "FAIL: Unable to load organization",
            }

        face_data["encodings"].append(face_encodings[0].tolist())
        face_data["ids"].append(timestamp)

        np.save(self.file_path, face_data)

        return {"encodedId": str(timestamp),
                "statusCode": 1,
                "message": "PASS: Encode Success"}

    def recognition(self, encoded_data):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        if os.path.exists(self.file_path):
            if self.load_and_compare_files(self.file_path, self.organ_empty)==1:
                print("ERROR: Organization is empty.")
                return {
                    "statusCode": -1,
                    "checkedTime": timestamp,
                    "message": "FAIL: Organization is empty",
                }
            else:
                pass
        else:
            print("ERROR: Oganization not found")
            return {
                "statusCode":-1,
                "checkedTime": timestamp,
                "message": "FAIL: Oganization not found",
            }

        decoded_data = base64.b64decode(encoded_data)
        timestamp = int(time.time())
        img_path = f"api/{timestamp}.jpg"

        with open(img_path, "wb") as img_file:
            img_file.write(decoded_data)

        face_image = face_recognition.load_image_file(img_path)

        if not face_recognition.face_encodings(face_image):
            for i in range(3):
                img = Image.open(img_path)
                img = img.rotate(90)
                img.save(img_path)

                face_image = face_recognition.load_image_file(img_path)

                if not face_recognition.face_encodings(face_image):
                    if i == 2:
                        os.unlink(img_path)
                        print("Not found face in image")
                        return {
                            "statusCode": -1,
                            "checkedTime": timestamp,
                            "message": "FAIL: Face not found on image"
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

        faces_result = []
        for idx, face_encoding in enumerate(face_encodings):
            face_distances = face_recognition.face_distance(self.face_data["encodings"], face_encoding)
            
            for i, distance in enumerate(face_distances):
                if distance <= 0.9:
                    id = self.face_data["ids"][i]
                    confidence = self.calculate_face_confidence(distance)
                    percentage = float(confidence.replace("%", ""))
                    if percentage > 95:
                        print("Success")
                        faces_result.append({
                            "id": str(id),
                            "statusCode": 1,
                            "accuracy": percentage,
                            "checkedTime": timestamp,
                            "message": "PASS: Recognition Success"
                        })
        if faces_result:
            return faces_result

        print("Unknown face")
        return {
            "statusCode": 0,
            "checkedTime": timestamp,
            "message":"PASS: Unknown face"
        }

    def recognition_file(self, image):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        if os.path.exists(self.file_path):
            if self.load_and_compare_files(self.file_path, self.organ_empty)==1:
                print("ERROR: Organization is empty.")
                return {
                    "statusCode": -1,
                    "checkedTime": timestamp,
                    "message": "FAIL: Organization is empty",
                }
            else:
                pass
        else:
            print("ERROR: Oganization not found")
            return {
                "statusCode":-1,
                "checkedTime": timestamp,
                "message": "FAIL: Oganization not found",
            }

        face_image = face_recognition.load_image_file(image)

        if not face_recognition.face_encodings(face_image):
            
            print("Not found face in image")
            return {
                "statusCode": -1,
                "checkedTime": timestamp,
                "message": "FAIL: Not found face on image",
            }

        small_frame = cv2.resize(face_image, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = np.ascontiguousarray(small_frame[:, :, ::-1])

        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(
            rgb_small_frame, face_locations
        )

        faces_result = []
        for idx, face_encoding in enumerate(face_encodings):
            face_distances = face_recognition.face_distance(self.face_data["encodings"], face_encoding)
            
            for i, distance in enumerate(face_distances):
                if distance <= 0.9:
                    id = self.face_data["ids"][i]
                    confidence = self.calculate_face_confidence(distance)
                    percentage = float(confidence.replace("%", ""))
                    if percentage > 80:
                        print("Success")
                        faces_result.append({
                            "id": str(id),
                            "statusCode": 1,
                            "accuracy": percentage,
                            "checkedTime": timestamp,
                            "message": "PASS: Recognition Success"
                        })
        if faces_result:
            return faces_result

        print("Unknown face")
        return {
            "statusCode": 0,
            "checkedTime": timestamp,
            "message":"PASS: Unknown face"
        }
