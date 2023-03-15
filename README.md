## TODO Major

- [ ] Limit files to 1GB. What should the timeout be??
- [ ] Integrate Stripe Checkout
- [ ] Hint
- [ ] Download file

## TODO Minor / Cleanup

- [ ] Back button
- [ ] Real FAQ and copy
- [ ] Better progress bar, it's not quite long enough? Don't give the upload as much space
- [?] Handle Axios Errors. What should we do?

## TODO Eventually

- [ ] Use a function worker for transcription and app platform for the API
- [ ] Real storage / permanance. Upload to cloud storage first, then transcribe. Give them a URL or something.


## Python / PIP Notes

Save requirements to the file

  > pip freeze -l > requirements.txt

Install from saved requirements

  > pip install -r requirements.txt




# Bottle

https://bottlepy.org/docs/dev/tutorial.html#file-uploads

Run Dev

    > python3 main.py

Build Client

    > npx webpack -w


## Deploy to Digital Ocean (No longer in use)

Generate an access token, then

    > brew install doctl
    > doctl registry login

Build Docker Image

    > docker build --platform linux/amd64 -t registry.digitalocean.com/badger/transcribe:latest .

Deploy

    > docker tag my-image:latest registry.digitalocean.com/badger/transcribe:latest
    > docker push registry.digitalocean.com/badger/transcribe:latest


## Deepgram Response


```
{
    "metadata": {
        "transaction_key": "deprecated",
        "request_id": "b199ad93-7937-4c13-9098-e7744879abe4",
        "sha256": "4d92faa21d38121731b8518ccb26410d90ba472599baa19a1195d76ff52ad073",
        "created": "2023-03-03T16:33:13.015Z",
        "duration": 2.243,
        "channels": 1,
        "models": [
            "c12089d0-0766-4ca0-9511-98fd2e443ebd"
        ],
        "model_info": {
            "c12089d0-0766-4ca0-9511-98fd2e443ebd": {
                "name": "general",
                "version": "2022-01-18.1",
                "arch": "vega"
            }
        }
    },
    "results": {
        "channels": [
            {
                "alternatives": [
                    {
                        "transcript": "Testing interesting testing.",
                        "confidence": 0.7962836,
                        "words": [
                            {
                                "word": "testing",
                                "start": 0.41812497,
                                "end": 0.81633925,
                                "confidence": 0.4996559,
                                "punctuated_word": "Testing"
                            },
                            {
                                "word": "interesting",
                                "start": 0.81633925,
                                "end": 1.2145535,
                                "confidence": 0.7962836,
                                "punctuated_word": "interesting"
                            },
                            {
                                "word": "testing",
                                "start": 1.2145535,
                                "end": 1.7145535,
                                "confidence": 0.23252293,
                                "punctuated_word": "testing."
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```