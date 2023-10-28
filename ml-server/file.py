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

def delete_file(filename, directory="dataset/"):
    file_path = os.path.join(directory, filename)

    if os.path.exists(file_path):
        os.remove(file_path)
        return {
            "statusCode":1,
            "message":filename,
        }
    else:
        return {
            "statusCode":-1,
            "message":"Oganization not found"
        }


def create_file(directory="dataset/"):
    while True:
        filename_random = generate_random_filename(10)
        if check_unique_filename(filename_random, directory) == 1:
            pass
        else:
            face_data = {"encodings": [], "ids": []}
            np.save(os.path.join(directory, f"{filename_random}.npy"), face_data)
            return{
                "organizationID":filename_random,
                "statusCode":1,
            }
    