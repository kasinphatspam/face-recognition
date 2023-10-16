import random
import string
import os
import numpy as np


def generate_random_filename(length):
    characters = string.digits + string.ascii_uppercase
    random_filename = "".join(random.choice(characters) for _ in range(length))
    return random_filename


def check_unique_filename(filename, directory="dataset/"):
    directory_list = os.listdir(directory)
    return filename + ".npy" not in directory_list


def create_file(filename, directory="dataset/"):
    if check_unique_filename(filename, directory):
        face_data = {"encodings": [], "ids": []}
        np.save(os.path.join(directory, f"{filename}.npy"), face_data)
        return True
    else:
        return create_file(generate_random_filename(8), directory)
