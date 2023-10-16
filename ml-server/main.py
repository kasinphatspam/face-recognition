import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from recognition import FaceRecognition
from file import generate_random_filename, create_file

app = Flask(__name__)
load_dotenv()


@app.route("/")
def hello():
    return "Hello world!"


@app.route("/status")
def status():
    return jsonify({"message": "Server connected"})


@app.route("/create-package")
def create_package():
    package_key = generate_random_filename(8)
    if create_file(package_key):
        return jsonify(
            {"message": "File package has been created", "packageKey": package_key}
        )
    else:
        return jsonify({"message": "Failed to create the file package."})


@app.route("/face-recognition", methods=["POST"])
def face_recognition_service():
    data = request.json
    package_key = data["packageKey"]
    image = data["imageBase64"]
    result = FaceRecognition(package_key).recognition(image)
    return jsonify(result)


@app.route("/recognition/dataset/encode", methods=["PUT"])
def encode():
    data = request.json
    package_key = data["packageKey"]
    image = data["imageBase64"]
    encoded_id = FaceRecognition(package_key).encode(image)
    return jsonify({"encodedId": encoded_id})


@app.route("/recognition/dataset/delete", methods=["PUT"])
def delete():
    data = request.json
    package_key = data["packageKey"]
    encode_id = data["encodedId"]
    return jsonify(FaceRecognition(package_key).deleteimage(encode_id))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002)
