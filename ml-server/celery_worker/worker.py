import os
from celery import Celery
from celery.result import AsyncResult

BACKEND_URL: str = os.environ.get('BACKEND_URL',"redis://localhost:6379/1")
BROKER_URL: str = os.environ.get('BROKER_URL',"pyamqp://rabbit_user:rabbit_password@rabbit//")

app = Celery(
    "celery_worker",
    backend="redis://localhost:6379/1",
    broker="pyamqp://rabbit_user:rabbit_password@localhost:5672//",
    namespace='CELERY',
    include=['celery_worker.tasks']
    )

def get_task_info(task_id: str) -> dict[str, str]:
    task_result = AsyncResult(task_id)
    result = {
        'task_id': task_id,
        'task_status': task_result.state,
        'task_result': task_result.result,  
    }
    return result
