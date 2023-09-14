import random
import string
import os

def generate_random_filename(length):
    """
    Generates a random alphanumeric filename of the specified length.
    
    Args:
    - length (int): The length of the filename to generate.
    
    Returns:
    - str: A random alphanumeric filename.
    """
    characters = string.digits + string.ascii_uppercase
    random_filename = ''.join(random.choice(characters) for _ in range(length))
    return random_filename

def check_unique_filename(filename):
    """
    Checks if a filename is unique within a specified directory.
    
    Args:
    - filename (str): The filename to check.
    
    Returns:
    - bool: True if the filename is unique, False otherwise.
    """
    directory_list = os.listdir("dataset/image/")
    count = 0
    for i in directory_list:
        if i == filename + ".npy":
            count += 1
    if count != 0:
        return False
    return True

def create_file(filename):
    """
    Creates a pair of empty files with the given filename.

    Args:
    - filename (str): The filename for the pair of files.

    Returns:
    - bool: True if the files were created successfully, False if the filename is not unique.
    """
    if check_unique_filename(filename):
        file_image = f"dataset/image/{filename}.npy"
        file_encodeId = f"dataset/id/{filename}.npy"
        
        # Create empty files
        open(file_image, 'wb').close()
        open(file_encodeId, 'wb').close()
        
        return True
    else:
        # If the filename is not unique, recursively create a new filename
        return create_file(generate_random_filename(8))
