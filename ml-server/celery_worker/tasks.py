import time
from src.recognition import FaceRecognition
from .worker import app

@app.task(name="test task")
def async_task(Time: int) -> dict[str, int]:
    time.sleep(Time)
    return { "result": 200 }

@app.task(name="face recognition task")
def face_recognition_task(package_key: str, image: str):
    encoded_id = FaceRecognition(package_key).encode(image)
    return { "result": encoded_id }