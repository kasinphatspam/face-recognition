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
    dict = { "status": "connected"}
    return dict

@app.route("/contact", methods=['GET','POST','DELETE'])
def contact():

    # Add new contact dataset
    if request.method == 'POST':
        request_data = request.get_json()
        name = request_data['name']
        image = request_data['imageBase64']
        # return data_task.api_add(image,name)
    
    # Delete contact dataset
    if request.method == 'DELETE':
        request_data = request.get_json()
        name = request_data['name']
        if name is None:
            return 'None'
        # return data_task.api_remove(name)
    
    return 'HTTP_METHOD_NOT_SUPPORTED'

@app.route("/face-recognition", methods=['GET','POST','DELETE'])
def face_recognition_service(): 
    if request.method == 'POST':
        request_data = request.get_json()
        image = request_data['imageBase64']
        camera_side = request_data['cameraSide']
        return recognition.run(image,camera_side)
    
    return 'HTTP_METHOD_NOT_SUPPORTED'

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=3000)






