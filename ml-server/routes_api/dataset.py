from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from src.file import generate_random_filename, create_file, delete_file

router = APIRouter(
  prefix="/dataset-files",
  tags=["dataset"]
)

@router.post("/")
def create_package():
  packageId = create_file()
  return JSONResponse(status_code=status.HTTP_200_OK, content=packageId)

@router.delete("/")
def delete_package():
  def delete_package():
    data = request.json
    package_key = data["packageKey"]
    status = delete_file(package_key)
    return JSONResponse(status_code=status.HTTP_200_OK, content=status)
