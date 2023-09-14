# Import necessary modules
import recognition
import file
from dotenv import load_dotenv
from flask import Flask, request

# Load global variables from .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)

# Define a route for the root URL ("/")
@app.route("/")
def hello():
    return "Hello world!"

# Define a route for checking the server status ("/status")
@app.route("/status")
def status():
    # Test server response
    response_dict = { "message": "Server connected" }
    return response_dict

# Define a route for creating a package ("/create-package")
@app.route("/create-package")
def create_package():
    # Generate a random package key
    package_key = file.generate_random_filename(8)
    
    # Attempt to create a file package
    if file.create_file(package_key):
        response_dict = { "message": "File package has been created", "packageKey": package_key }
    else:
        response_dict = { "message": "Failed to create the file package." }
    
    return response_dict

# Define a route for face recognition ("/face-recognition")
@app.route("/face-recognition", methods=['GET', 'POST', 'PUT', 'DELETE'])
def face_recognition_service():
    data = request.json

    if request.method == 'POST':
        # Handle a POST request for face recognition
        package_key = data['packageKey']
        image = data['imageBase64']
        result = recognition.run(package_key, image)
        return result

    if request.method == 'PUT':
        # Handle a PUT request for encoding an image
        package_key = data['packageKey']
        image = data['imageBase64']
        encoded_id = recognition.encode(package_key, image)
        response_dict = { "encodedId": encoded_id }
        return response_dict

    if request.method == 'DELETE':
        # Handle a PUT request for encoding an image
        package_key = data['packageKey']
        encode_id = data['encodedId']
        return recognition.delete(package_key, encode_id)

    # Return an error message for unsupported HTTP methods
    return 'HTTP_METHOD_NOT_SUPPORTED'

# Start the Flask app if this script is executed
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3002)
