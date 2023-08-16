import random
import string

def generate_random_filename(length):
    characters = string.digits + string.ascii_uppercase
    random_filename = ''.join(random.choice(characters) for _ in range(length))
    return random_filename

def createFile(filename):
    file_image = f"dataset/image/{filename}.npy"  # Create a name for the name .npy file
    file_encodeId = f"dataset/id/{filename}.npy"  # Create a name for the userID .npy file
    open(file_image, 'wb')
    open(file_encodeId, 'wb')
    return True