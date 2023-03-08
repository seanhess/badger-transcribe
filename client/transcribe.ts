import axios, {isCancel, AxiosError, AxiosResponse, AxiosProgressEvent} from 'axios';

export type TranscribeOptions = {
  punctuate: boolean
  numerals: boolean
}

export async function uploadAndTranscribe(file:File, options:TranscribeOptions, onProgress:(e:number) => void):Promise<Result> {
  console.log("UPLOAD", file, file.name)
  const formData = new FormData()
  formData.append("upload", file)
  formData.append("punctuate", JSON.stringify(options.punctuate))
  formData.append("numerals", JSON.stringify(options.punctuate))

  // TODO handle serverside error (HTML return format)
  const res:AxiosResponse<Result> = await axios.postForm("/upload", formData,
    { onUploadProgress: ({progress}) => onProgress(progress) }
  )
  // const data = await res.json();
  return handleResults(res.data)
}

function handleResults(data:Result | ServerError):Result {
  if ((data as ServerError).error) {
    throw new Error((data as ServerError).error)
  }

  return data as Result
}

export function expectedSeconds(file:File):number {
  // Deepgram says 30 seconds for 1h of audio
  // 1h of mp3 is ~100mb
  // 30 seconds for every 100 mb

  // expect a minimum of 5s

  let mb = file.size / 1000000
  let durSeconds = (mb / 100) * 30
  return Math.max(durSeconds, 5)
}

export type Result = { transcript: string }
type ServerError = { error: string }