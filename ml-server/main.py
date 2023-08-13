import recognition
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

@app.route("/face-recognition", methods=['GET','POST', 'PUT','DELETE'])
def face_recognition_service(): 
    request_data = request.get_json()
    if request.method == 'POST':
        image = request_data['imageBase64']
        return recognition.run(image)
    
    if request.method == 'PUT':
        image = request_data['imageBase64']
        dict = { "encodedId":  recognition.encode(image) }
        return dict
    
    return 'HTTP_METHOD_NOT_SUPPORTED'

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=3002)






