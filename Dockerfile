# syntax=docker/dockerfile:1

FROM python:3.11.2-slim-buster
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
RUN echo $PORT
CMD [ "python3", "-m" , "bottle", "-b", "127.0.0.1:80", "app"]