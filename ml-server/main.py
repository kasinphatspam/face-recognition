import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from recognition import FaceRecognition
from file import generate_random_filename, create_file, delete_file

app = Flask(__name__)
load_dotenv()

#TEST-PASS
@app.route("/")
def hello():
    return "Hello world!"

#TEST-PASS
@app.route("/status")
def status():
    return jsonify({"message": "Server connected"})

#TEST-PASS
@app.route("/dataset-file", methods=["POST"])
def create_package():
    packageId = create_file()
    return jsonify(packageId)

#TEST-PASS
@app.route("/dataset-file", methods=["DELETE"])
def delete_package():
    data = request.json
    package_key = data["oganizationID"]
    status = delete_file(package_key)
    return jsonify(status)


@app.route("/face-recognition", methods=["POST"])
def face_recognition_service():
    data = request.json
    package_key = data["oganizationID"]
    image = data["imageBase64"]
    result = FaceRecognition(package_key).recognition(image)
    return jsonify(result)


@app.route("/face-recognition", methods=["PUT"])
def encode():
    data = request.json
    package_key = data["oganizationID"]
    image = data["imageBase64"]
    encoded_id = FaceRecognition(package_key).encode(image)
    return jsonify({"encodedId": encoded_id})


@app.route("/face-recognition", methods=["DELETE"])
def delete():
    data = request.json
    package_key = data["oganizationID"]
    encode_id = data["encodedId"]
    return jsonify(FaceRecognition(package_key).delete_image(encode_id))

#TEST-PASS
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002)
