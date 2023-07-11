import cv2
import os
import face_recognition
import numpy as np
import shutil
import utils as ut
import time
import base64
from dotenv import load_dotenv

def add():
    os.system('cls||clear')
    ut.show_add_titlebar()
    name_of_image = input("Enter your Name: ")

    # check if user input null value.
    if name_of_image == None:
        return
    
    # load global variable from .env file
    load_dotenv()
    # get folder path from .env
    folder_path = os.getenv('SOURCE_DATA_PATH')
    encoded_path = os.getenv('ENCODED_DATA_PATH')
    # get file path of encoding from .env
    file_path_image = os.getenv('ENCODED_IMAGE_FILE')
    file_path_name = os.getenv('ENCODED_NAME_FILE')
    file_path_id = os.getenv('ENCODED_ID_FILE')

    # open camera by opencv and capture the picture
    cap = cv2.VideoCapture(0)
    while True:
        # Read a frame from the camera
        ret, frame = cap.read()

        # Display the frame
        cv2.imshow("Camera", frame)

        # Check if 't' key is pressed
        if cv2.waitKey(1) & 0xFF == ord(" "):
            # Save the captured image
            cv2.imwrite(f"{folder_path}/{name_of_image}.jpg", frame)
            print("Image captured.")
            break
    cap.release()
    cv2.destroyAllWindows()

    # load image file
    face_image = face_recognition.load_image_file(
        f"{folder_path}/{name_of_image}.jpg"
    )
    # encoding image file
    face_encodings = face_recognition.face_encodings(face_image)

    # verify that the data file list is not empty.
    if len(os.listdir(folder_path)) == 0:
        print("There is no image to add to Database")
        return
    
    # check is it have face in picture
    if len(face_encodings) <= 0:
        print("No face found.")
        os.remove(f"{folder_path}/{name_of_image}.jpg")
        return
    
    known_face_encodings = None
    face_names = None

    # check that is it first time for encoding ?
    if os.path.getsize(file_path_image) == 0:
        known_face_encodings = np.empty((0, 128))
        face_names = []
    else:
        known_face_encodings = np.load(file_path_image)
        face_names = np.load(file_path_name)

    for image in os.listdir("data"):
        face_image = face_recognition.load_image_file(
            f"data/{image}"
        )
        face_encodings = face_recognition.face_encodings(face_image)

        if len(face_encodings) > 0:
            face_encoding = face_encodings[0]
            known_face_encodings = np.concatenate(
                (known_face_encodings, [face_encoding]), axis=0
            )
            face_names = np.concatenate((face_names, [image]))
            print(f"added {image}")
            source_file = f"./data/{image}"
            destination_folder = f"{encoded_path}/"
            shutil.move(source_file, destination_folder)
    np.save(file_path_image, known_face_encodings)
    np.save(file_path_name, face_names)

def remove():
    # load global variable from .env file
    load_dotenv()
    # get folder path from .env
    folder_path = os.getenv('SOURCE_DATA_PATH')
    encoded_path = os.getenv('ENCODED_DATA_PATH')
    # get file path of encoding from .env
    file_path_image = os.getenv('ENCODED_IMAGE_FILE')
    file_path_name = os.getenv('ENCODED_NAME_FILE')
    file_path_id = os.getenv('ENCODED_ID_FILE')

    # load image in path folder
    known_face_encodings = np.load(file_path_image)
    known_face_encodings = np.array(known_face_encodings, dtype=np.float64)
    known_face_names = np.load(file_path_name)
    known_face_names = np.array(known_face_names)

    remove_name = input("input: ")
    remove_name = remove_name + ".jpg"

    file_path = os.path.join(encoded_path, remove_name)
    for i in range(len(known_face_names) - 1, -1, -1):
        if remove_name == known_face_names[i]:
            print(f"deleting {remove_name}")
            known_face_encodings = np.delete(known_face_encodings, i, axis=0)
            known_face_names = np.delete(known_face_names, i, axis=0)
            if os.path.isfile(file_path):
                os.remove(file_path)
            else:
                print(f"The file '{remove_name}' does not exist in the folder.")

    np.save(file_path_image, known_face_encodings)
    np.save(file_path_name, known_face_names)

def api_add(name, encoded_data):
    if name == None:
        return 'None object'
    # load global variable from .env file
    load_dotenv()
    # get folder path from .env
    folder_path = os.getenv('SOURCE_DATA_PATH')
    encoded_path = os.getenv('ENCODED_DATA_PATH')
    # get file path of encoding from .env
    file_path_image = os.getenv('ENCODED_IMAGE_FILE')
    file_path_name = os.getenv('ENCODED_NAME_FILE')
    file_path_id = os.getenv('ENCODED_ID_FILE')

    # decode base64 string data
    decoded_data = base64.b64decode((encoded_data))
    # getting the timestamp
    ts = time.time()
    # write the decoded data back to original format in  file
    img_file = open(f"./api/{ts}.jpeg", "wb")
    img_file.write(decoded_data)
    img_file.close()
    # compare
    if len(os.listdir("./api")) == 0:
        return "There is no image in api folder"
    buffer = []
    face_image = face_recognition.load_image_file(f"api/{ts}.jpeg")

    return name

def api_remove(name):
    # load global variable from .env file
    load_dotenv()
    # get folder path from .env
    folder_path = os.getenv('SOURCE_DATA_PATH')
    encoded_path = os.getenv('ENCODED_DATA_PATH')
    # get file path of encoding from .env
    file_path_image = os.getenv('ENCODED_IMAGE_FILE')
    file_path_name = os.getenv('ENCODED_NAME_FILE')
    file_path_id = os.getenv('ENCODED_ID_FILE')

    # load image in path folder
    known_face_encodings = np.load(file_path_image)
    known_face_encodings = np.array(known_face_encodings, dtype=np.float64)
    known_face_names = np.load(file_path_name)
    known_face_names = np.array(known_face_names)

    remove_name = name + ".jpg"

    file_path = os.path.join(encoded_path, remove_name)
    for i in range(len(known_face_names) - 1, -1, -1):
        if remove_name == known_face_names[i]:
            print(f"deleting {remove_name}")
            known_face_encodings = np.delete(known_face_encodings, i, axis=0)
            known_face_names = np.delete(known_face_names, i, axis=0)
            if os.path.isfile(file_path):
                os.remove(file_path)
            else:
                print(f"The file '{remove_name}' does not exist in the folder.")
                
    np.save(file_path_image, known_face_encodings)
    np.save(file_path_name, known_face_names)
    return 'remove successfully'