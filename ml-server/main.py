import recognition
import file
from dotenv import load_dotenv
from flask import Flask, request

# Load global variable from .env file
load_dotenv()

# Initialize router in Python SDK
app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello world!"

@app.route("/status")
def status():
    # Test server response
    dict = { "message": "Server connected"}
    return dict

@app.route("/create-package")
def create_package():
    packageKey = file.generate_random_filename(8)
    if(file.createFile(packageKey)):
        return { "message": "File package has been created", "packageKey": packageKey }
    return { "message": "Failed to create the file package."}

@app.route("/face-recognition", methods=['GET','POST', 'PUT','DELETE'])
def face_recognition_service(): 
    data = request.json
    if request.method == 'POST':
        packageKey = data['packageKey']
        image = data['imageBase64']
        return recognition.run(packageKey, image)
    
    if request.method == 'PUT':
        packageKey = data['packageKey']
        image = data['imageBase64']
        dict = { "encodedId":  recognition.encode(packageKey, image) }
        return dict
    
    return 'HTTP_METHOD_NOT_SUPPORTED'

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=3002)






