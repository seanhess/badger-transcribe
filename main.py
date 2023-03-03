from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from deepgram import Deepgram
from tempfile import NamedTemporaryFile
import shutil
import os
import json

app = FastAPI()

# Initializes the Deepgram SDK
DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')
deepgram = Deepgram(DEEPGRAM_API_KEY)


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
            <input type="file" id="myFile" name="audio">
            <input type="submit">
          </form>
        </body>
    </html>
    """


@app.post("/files/")
async def create_file(audio: UploadFile):
  print(audio.filename)

  # Sweet! We have file contents
  # contents = await audio.read()

  file = copy_file(audio)
  transcript = await upload_file(audio)

  # audio.file - the file object

  return {"file_size": audio.filename, "transcript": transcript}

@app.get("/test")
async def test():
    return {"message": "TEST!"}

app.mount("/static", StaticFiles(directory="static"), name="static")


async def copy_file(audio:UploadFile):
  dest = NamedTemporaryFile()
  print(dest.name)
  asdf = open(dest.name)
  await shutil.copyfileobj(audio, asdf)
  print("COPIED")
  return dest


async def upload_file(audio: File):

  # Copy to a named local file

  # dest.name is the filepath

  # with await open(audiofile.file, 'rb') as audio:
  # ...or replace mimetype as appropriate

  # source = {'url': URL_TO_AUDIO_FILE}

  with open(audio.name, 'rb') as upload:
    source = {'buffer': upload, 'mimetype': 'audio/m4a'}

    response = await deepgram.transcription.sync_prerecorded(source, {'punctuate': True})
    print("OK")
    print(json.dumps(response, indent=4))
    return response


# from shutil import COPY_BUFSIZE


# https://docs.python.org/3/library/shutil.html#shutil.copyfileobj

# shutil.copyfileobj(fsrc, fdst[, length])
# uses file handles!

# Copy the contents of the file-like object fsrc to the file-like object fdst. The integer length, if given, is the buffer size. In particular, a negative length value means to copy the data without looping over the source data in chunks; by default the data is read in chunks to avoid uncontrolled memory consumption. Note that if the current file position of the fsrc object is not 0, only the contents from the current file position to the end of the file will be copied.