from bottle import route, post, get, run, redirect, template, static_file, request, FileUpload, default_app, HTTPResponse
from tempfile import NamedTemporaryFile
from typing import BinaryIO, TypedDict, Optional, Match, Union
from app.transcribe import transcribe_upload, InvalidFiletype, Options
import shutil
import os
import stripe
from math import ceil


stripe.api_key = 'sk_test_HMIOpn5GnEGaPj5gnn0KZ0MX'

DOMAIN = os.environ['APP_ENDPOINT']
print("Domain:", DOMAIN)

# The price-id for our $1 product
# PRICE_1USD = "price_0Mlv7hSgRLsuDnmGC5IJ9rTW"


@route("/")
def root():
  return static_file("app.html", root='./static')


@post("/upload")
def upload():
  upload:FileUpload = request.files.get('upload')

  size = int(request.headers["Content-Length"])
  print("SIZE", size)
  if (size > 10*1000000):
    return HTTPResponse(status=413, body={"error": "FileTooLarge", "size": size})

  options = Options()
  options.punctuate = request.forms.get('punctuate')
  options.numerals = request.forms.get('numerals')
  _, ext = os.path.splitext(upload.filename)

  try:
    result = transcribe_upload(upload, options)
    return {"transcript": result.get('transcript')}
  except InvalidFiletype: 
    return HTTPResponse(status=400, body={"error": "InvalidFiletype", "ext": ext})

@post("/checkout")
def checkout():
  # price = int(request.forms.get('price'))
  name = request.forms.get('name')
  size = int(request.forms.get('size'))

  UNIT_PRICE = 100
  UNIT_SIZE = 1000*1000
  units = ceil(size / UNIT_SIZE)

  print("CHECKOUT:", name, size, units)

  try:
    checkout_session = stripe.checkout.Session.create(
        line_items=[
          {
            'description': "Audio Transcription",
            'name': "Transcribe: " + name,
            'currency': "usd",
            'amount': UNIT_PRICE,
            'quantity': units,
          },
        ],
        mode='payment',
        success_url=DOMAIN + '/payment/success',
        cancel_url=DOMAIN + '/payment/canceled',
    )
  except Exception as e:
    return str(e)

  return redirect(checkout_session.url, code=303)


@get("/payment/success")
def payment():
  return static_file("app.html", root='./static')

@get("/payment/canceled")
def payment_canceled():
  return static_file("app.html", root='./static')
  


@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')

app = default_app()

if __name__ == "__main__":
  print("RUNNING RELOADER")
  run(reloader=True)




