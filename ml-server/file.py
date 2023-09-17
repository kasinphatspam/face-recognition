import random
import string
import os
import numpy as np

def generate_random_filename(length):
    characters = string.digits + string.ascii_uppercase
    random_filename = ''.join(random.choice(characters) for _ in range(length))
    return random_filename

def check_unique_filename(filename):
    directory_list = os.listdir("dataset/")
    count = 0
    for i in directory_list:
        if i == filename + ".npy":
            count += 1
    if count != 0:
        return False
    return True

def create_file(filename):
    if check_unique_filename(filename):

        face_data = {"encodings": [], "ids": []}
        np.save(f"./dataset/{filename}.npy", face_data)
        
        return True
    else:
        # If the filename is not unique, recursively create a new filename
        return create_file(generate_random_filename(8))
