from bottle import route, post, get, run, template, static_file, request, FileUpload, default_app
from tempfile import NamedTemporaryFile
from typing import BinaryIO, TypedDict, Optional, Match, Union
from app.transcribe import transcribe_upload, InvalidFiletype
import shutil
import os



@route("/")
def root():
  return static_file("app.html", root='./static')


@post("/upload")
def upload() -> dict:
  upload:FileUpload = request.files.get('upload')
  _, ext = os.path.splitext(upload.filename)

  try:
    result = transcribe_upload(upload)
    return {"transcript": result.get('transcript')}
  except InvalidFiletype: 
    return {"error": "InvalidFiletype", "ext": ext}

  

@get("/test")
def test():
    return {"message": "TESTx"}

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')

app = default_app()

if __name__ == "__main__":
  print("RUNNING RELOADER")
  run(reloader=True)




