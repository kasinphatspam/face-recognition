import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from recognition import FaceRecognition
from file import create_file, delete_file
import time
app = Flask(__name__)
load_dotenv()
path = ["/api", "/data", "/dataset"]

def create_folders(folder_paths):
    current_path = os.getcwd()
    for folder_path in folder_paths:
        full_path = current_path + folder_path
        try:
            if not os.path.exists(full_path):
                os.makedirs(full_path, mode=0o777)
                print(f"Folder created at {full_path}")
            else:
                print(f"Folder already exists at {full_path}")
        except Exception as e:
            print(f"Failed to create folder at {full_path}: {e}")
    
    
#TEST
#1. PASS Success
@app.route("/")
def hello():
    return "Hello world!"

#TEST
#1. PASS Success
@app.route("/status")
def status():
    return jsonify({"message": "Server connected"})

#TEST
#1. PASS Success
@app.route("/dataset-file", methods=["POST"])
def create_package():
    packageId = create_file()
    return jsonify(packageId)

#TEST
#1. PASS Success
#2. PASS Organization not found
@app.route("/dataset-file", methods=["DELETE"])
def delete_package():
    data = request.json
    package_key = data["packageKey"]
    status = delete_file(package_key)
    return jsonify(status)

#TEST
#1. PASS Success
#2. PASS Dataset is empty
#3. PASS Organization not found
#4. Unable to load organization
#5. PASS Face not found in image
#6. PASS Unknown face
@app.route("/face-recognition", methods=["POST"])
def face_recognition_service():
    data = request.json
    package_key = data["packageKey"]
    image = data["imageBase64"]
    result = FaceRecognition(package_key).recognition(image)
    return jsonify(result)

#TEST
#1. PASS Success
#2. PASS Face not found in image
#3. PASS Organization not found
#4. Unable to load organization
@app.route("/face-recognition", methods=["PUT"])
def encode():
    data = request.json
    package_key = data["packageKey"]
    image = data["imageBase64"]
    encoded_id = FaceRecognition(package_key).encode(image)
    return jsonify(encoded_id)


#TEST
#1. PASS Success
#2. PASS Face not found in image
#3. PASS Organization not found
#4. Unable to load organization
@app.route("/face-recognition-file", methods=["PUT"])
def encode_file():
    package_key = request.form["packageKey"]
    image = request.files["image"]
    encoded_id = FaceRecognition(package_key).encode_file(image)
    return jsonify(encoded_id)

#TEST
#1. PASS Success
#2. PASS Face not found in image
#3. PASS Organization not found
#4. Unable to load organization
@app.route("/face-recognition-file", methods=["POST"])
def face_recognition_service_file():
    package_key = request.form["packageKey"]
    image = request.files["image"]
    result = FaceRecognition(package_key).recognition_file(image)
    return jsonify(result)

#TEST
#1. PASS Success
#2. PASS Organization is empty
#3. PASS Organization not found
#4. PASS Encode id not found in organization
@app.route("/face-recognition", methods=["DELETE"])
def delete():
    data = request.json
    package_key = data["packageKey"]
    encode_id = data["encodedId"]
    return jsonify(FaceRecognition(package_key).delete_image(encode_id))

#TEST
#1. PASS Success
if __name__ == "__main__":
    create_folders(path)
    app.run(host="0.0.0.0", port=3002)
