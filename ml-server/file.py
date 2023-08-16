import random
import string
import os

def generate_random_filename(length):
    characters = string.digits + string.ascii_uppercase
    random_filename = ''.join(random.choice(characters) for _ in range(length))
    return random_filename

def check_unique_filename(filename):
    directory_list = os.listdir("dataset/image/")
    count = 0
    for i in directory_list:
        if i == filename + ".npy":
            count+=1
    if count != 0:
        return False
    return True

def createFile(filename):
    if check_unique_filename(filename):
        file_image = f"dataset/image/{filename}.npy"
        file_encodeId = f"dataset/id/{filename}.npy"
        open(file_image, 'wb')
        open(file_encodeId, 'wb')
        return True
    return createFile(generate_random_filename(8))
    