from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <html>
        <head>
          <title>Some HTML in here</title>
        </head>
        <body>
          <h1>Look ma! HTML!</h1>
          <form method="POST" action="/files/" enctype="multipart/form-data">
            <input type="file" id="myFile" name="file">
            <input type="submit">
          </form>
        </body>
    </html>
    """

@app.post("/files/")
async def create_file(file: UploadFile):
  print(file.filename)
  return {"file_size": file.filename}

@app.get("/test")
async def test():
    return {"message": "TEST!"}

app.mount("/static", StaticFiles(directory="static"), name="static")