from typing import BinaryIO, TypedDict, Optional
from deepgram import Deepgram
from deepgram._types import PrerecordedTranscriptionResponse, Alternative
from bottle import FileUpload
from enum import Enum
import json
import os

# Initializes the Deepgram SDK
DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')
deepgram = Deepgram(DEEPGRAM_API_KEY)

class Features():
  punctuate: bool
  numerals: bool
  speakers: bool

# https://developers.deepgram.com/documentation/features/
def transcribe_upload(upload: FileUpload, features: Features) -> Alternative:
  audio = upload_source(upload)

  options = {
    'alternatives': 1, # only return 1 option. They can give more!


    # Smart format appears to enable punctuate and numerals
    # creates the "paragraphs" object in the return type
    # otherwise all you have is one big transcript and a list of words
    'smart_format': "true",

    # These are valid options
    'punctuate': features.punctuate,
    'numerals': features.numerals,
    'diarize': features.speakers,

    # What is the point of utterances??
    # 'utterances': 'true',

    # Enhanced is working. Nova isn't enabled. Will throw error if tier doesn't exist
    "model": 'general',
    "tier": 'enhanced'
  }


  response = deepgram.transcription.sync_prerecorded(audio, options)

  print("SENT", "punctuate:", options.get('punctuate'), "numerals:", options.get('numerals'), "diarize:", options.get('diarize'))
  # print(json.dumps(response, indent=4))

  f = open("output.json", "w")
  f.write(json.dumps(response, indent=4))
  f.close()

  return response.get("results").get("channels")[0].get("alternatives")[0]



class AudioSource(TypedDict):
  mimetype: str
  buffer: BinaryIO


class InvalidFiletype(Exception):
  """Raised when upload is an invalid file type / extension"""


def upload_source(upload:FileUpload) -> AudioSource:
  print("UP", upload.content_length)
  name, ext = os.path.splitext(upload.filename)
  ft = filetype(ext)

  if (ft is None):
    raise InvalidFiletype

  return {"buffer": upload.file, "mimetype": mimetype(ft)}

class Filetype(Enum):
  MP3 = 1
  AAC = 2
  WAV = 3
  FLAC = 4
  M4A = 5
  # MP2 = 1
  # MP4 = 3
  # MPEG = 8

def filetype(ext:str) -> Optional[Filetype]:
  match ext:
    case ".mp3": return Filetype.MP3
    case ".aac": return Filetype.AAC
    case ".wav": return Filetype.WAV
    case ".flac": return Filetype.FLAC
    case ".m4a": return Filetype.M4A
    # case ".mp2": return Filetype.MP2
    # case ".mp4": return Filetype.MP4
    # case ".mpeg": return Filetype.MPEG
    case _: return None

def mimetype(ft:Filetype) -> str:
  match ft:
    case Filetype.MP3:  return "audio/mpeg"
    case Filetype.AAC:  return "audio/aac"
    case Filetype.WAV:  return "audio/wav"
    case Filetype.FLAC: return "audio/flac"
    case Filetype.M4A:  return "audio/mp4"
    # case Filetype.MP2:  return "audio/mpeg"
    # case Filetype.MPEG: return "audio/mpeg"
    # case Filetype.MP4:  return "audio/mp4"

