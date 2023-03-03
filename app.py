from bottle import route, post, get, run, template, static_file, request, FileUpload, default_app
from tempfile import NamedTemporaryFile
from typing import BinaryIO, TypedDict, Optional, Match, Union
from transcribe import transcribe_upload, InvalidFiletype
import shutil
import os



@route("/")
def root():
    return """
    <html>
        <head>
          <title>Some HTML in here</title>
        </head>
        <body>
          <h1>Look ma! HTML!</h1>
          <form method="POST" action="/upload" enctype="multipart/form-data">
            Name:  <input type="text" name="name">
            Job:  <input type="text" name="job">
            File:  <input type="file" name="upload">
            <input type="submit" value="Start Upload">
          </form>
        </body>
    </html>
    """


@post("/upload")
def upload() -> dict:
  upload:FileUpload = request.files.get('upload')
  _, ext = os.path.splitext(upload.filename)

  try:
    result = transcribe_upload(upload)
    return {"result": result}
  except InvalidFiletype: 
    return {"error": "InvalidFiletype", "ext": ext}
  

  

@get("/test")
async def test():
    return {"message": "TEST!"}

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='/path/to/your/static/files')

# if __name__ == "__main__":
#     run(reloader=True)

app = default_app()
