import face_recognition
import time
import os, sys
import cv2
import numpy as np
import math
import datetime
import base64
from PIL import Image

def run():
    fr = FaceRecognition()
    fr.recognition()

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
    file_path_image = "encodedimage.npy"
    file_path_name = "encodedname.npy"
    face_locations = []
    face_encodings = []
    face_names = []
    file_size_name = os.path.getsize(file_path_name)

    # Check if the file is empty
    if file_size_name == 0:
        print("Database is empty")
    else:
        known_face_encodings = np.load(file_path_image)
        known_face_encodings = np.array(known_face_encodings, dtype=np.float64)
        known_face_names = np.load(file_path_name)
        known_face_names = np.array(known_face_names)

    process_current_frame = True

    def recognition(self):
        video_capture = cv2.VideoCapture(0)
        buffer = []

        if not video_capture.isOpened():
            sys.exit("Video source not found...")

        while True:
            ret, frame = video_capture.read()

            # Only process every other frame of video to save time
            if self.process_current_frame:
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

                self.face_names = []
                for face_encoding in self.face_encodings:
                    face_distances = face_recognition.face_distance(
                        self.known_face_encodings, face_encoding
                    )
                    best_match_index = np.argmin(face_distances)
                    if face_distances[best_match_index] <= 0.90:
                        name = self.known_face_names[best_match_index]
                        if name not in [entry[0] for entry in buffer]:
                            confidence = face_confidence(
                                face_distances[best_match_index]
                            )
                             # get percentage
                            confidence = face_confidence(face_distances[best_match_index])
                            percentage = float(confidence.replace("%",""))
                            if(percentage > 90):
                                self.face_names.append(f"{name} ({confidence})")
                                timestamp = datetime.datetime.now()
                                print(f"unlock for {timestamp} {name}")
                                buffer.append((name, datetime.datetime.now()))
                        else:
                            # Remove the name from the buffer after 1 minute
                            for i, entry in enumerate(buffer):
                                if entry[0] == name:
                                    current_time = datetime.datetime.now()
                                    time_difference = current_time - entry[1]
                                    buffer_timeout = datetime.timedelta(minutes=1)
                                    if time_difference >= buffer_timeout:
                                        buffer.pop(i)
                                    break
                    else:
                        self.face_names.append("Unknown")

            self.process_current_frame = not self.process_current_frame

            # Display the results
            for (top, right, bottom, left), name in zip(
                self.face_locations, self.face_names
            ):
                # Scale back up face locations since the frame we detected in was scaled to 1/4 size
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4

                # Create the frame with the name
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
                cv2.rectangle(
                    frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED
                )
                cv2.putText(
                    frame,
                    name,
                    (left + 6, bottom - 6),
                    cv2.FONT_HERSHEY_DUPLEX,
                    0.8,
                    (255, 255, 255),
                    1,
                )

            # Display the resulting image
            cv2.imshow("Face Recognition", frame)

            # Hit 'q' on the keyboard to quit!
            if cv2.waitKey(1) == ord("q"):
                break

        # Release handle to the webcam
        video_capture.release()
        cv2.destroyAllWindows()