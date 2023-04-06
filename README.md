## TODO Major

- [ ] Limit files to 1GB. What should the timeout be??
- [x] Integrate Stripe Checkout
- [x] Hint
- [x] Download file

## TODO Minor / Cleanup

- [x] Back button
- [ ] Real FAQ and copy
- [x] Better progress bar, it's not quite long enough? Don't give the upload as much space
- [?] Handle Axios Errors. What should we do?

## TODO Eventually

- [ ] Use a function worker for transcription and app platform for the API
- [x] Real storage / permanance. Upload to cloud storage first, then transcribe. Give them a URL or something.
- [ ] pydub to preview only the first minute of audio (chatGPT knows)



## Python / PIP Notes

Save requirements to the file

  > pip freeze -l > requirements.txt

Install from saved requirements

  > pip install -r requirements.txt



# Building


Run Dev

    > python main.py

Build Client

    > npx webpack -w

Using Bottle Framework: https://bottlepy.org/docs/dev/tutorial.html#file-uploads