import random
import string
import os
import numpy as np


def generate_random_filename(length):
    characters = string.digits + string.ascii_uppercase
    random_filename = "".join(random.choice(characters) for _ in range(length))
    return random_filename


def check_unique_filename(filename, directory="dataset/"):
    # Combine directory and filename to get the full file path
    file_path = os.path.join(directory, filename)

    # Check if the file exists
    if os.path.exists(file_path):
        return 1 # File name already exist
    else:
        return 0 # File name doesnt exist

def delete_file(filename):
    directory = "dataset/"
    file_path = os.path.join(directory, f"{filename}.npy")

    if os.path.exists(file_path):
        os.remove(file_path)
        return {
            "statusCode": 1,
            "message": filename,
        }
    else:
        return {
            "statusCode": -1,
            "message": "Organization not found"
        }

def create_file():
    directory = "./dataset/"
    os.makedirs(directory, exist_ok=True)
    while True:
        print("in while loop")
        filename_random = generate_random_filename(10)
        file_path = os.path.join(directory, f"{filename_random}.npy")

        if not os.path.exists(file_path):
            face_data = {"encodings": [], "ids": []}
            np.save(file_path, face_data)
            return {
                "packageKey": filename_random,
                "statusCode": 1,
            }

    