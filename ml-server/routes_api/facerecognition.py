from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from celery_worker.tasks import face_recognition_task
from celery_worker.worker import get_task_info

router = APIRouter(
  prefix="/face-recognition",
  tags=["recognition"]
)

class Data(BaseModel):
  package_key: str
  image: str
  
@router.post("/")
async def post_face_recognition(request: Data) -> JSONResponse:
  task_id = face_recognition_task.delay(request.package_key, request.image)
  return JSONResponse(status_code=status.HTTP_200_OK, content={'task_id': str(task_id), 'status': 'Processing'})

@router.get("/results/{task_id}")
async def get_face_recognition_result(task_id: str) -> JSONResponse:
  result = await get_task_info(task_id)
  return JSONResponse(status_code=status.HTTP_200_OK, content=result)
  
  
  