from fastapi import FastAPI, status # type: ignore
from fastapi.responses import JSONResponse
import routes_api.dataset as dataset_api
import routes_api.facerecognition as face_recognition_api
from dotenv import load_dotenv
import uvicorn
import os
from celery_worker.tasks import async_task
from celery_worker.worker import get_task_info

# -----------------------------------------------------------
# run app : python3 app.py
# run workers : celery -A celery_worker.worker worker -l info --concurrency=8
# -----------------------------------------------------------

load_dotenv()
path = ["/api", "/data", "/dataset"]

def create_folders(folder_paths):
  current_path = os.getcwd()
  for folder_path in folder_paths:
    if not os.path.exists(current_path + folder_path):
      os.makedirs(current_path + folder_path, mode=0o777)
      print(f"Folder created at {folder_path}")     
    else:
      print(f"Folder already exists at {folder_path}")
    
app = FastAPI()
app.include_router(dataset_api.router)
app.include_router(face_recognition_api.router)

@app.get('/')
def status():
  return JSONResponse(status_code=status.HTTP_200_OK, content="Server connected")

if __name__ == '__main__':
  create_folders(path)
  uvicorn.run(app=app, host='0.0.0.0', port=3002, ws_max_queue=100)

    