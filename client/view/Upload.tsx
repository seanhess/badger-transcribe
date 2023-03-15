import { ReactNode, useState, useEffect, FC } from "react";
import TargetBox from "../comp/TargetBox"
import * as Style from "../comp/Style"
import * as Icons from "../comp/Icons"
import { Content, Sidebar } from "../comp/Layout"
import { uploadAndTranscribe, expectedSeconds, TranscribeOptions } from "../transcribe"
import { AxiosProgressEvent } from "axios";
import { useInterval } from 'usehooks-ts'
import FAQ from "../comp/FAQ"
import Switch from "../comp/Switch"

interface Props {
  selectedFile: File
  onTranscript: (t:string) => void
  onRemoveFile: () => void
}

export const Upload:FC<Props> = ({onTranscript, onRemoveFile, selectedFile}) => {

  const [loading, setLoading] = useState<number>(null)
  const [uploaded, setUploaded] = useState<number>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [transcribeProgress, setTranscribeProgress] = useState<number>(0)


  useInterval(() => {
    if (uploadProgress >= 1) {
      let prog = currentTranscribeProgress()
      setTranscribeProgress(prog)
    }
  }, 100);

  function currentTranscribeProgress(): number {
    let exp = expectedSeconds(selectedFile) * 1000
    let dur = Date.now() - uploaded
    let prog = Math.min(1, dur / exp)
    return prog
  }

  // report the results of the transcription
  async function runTranscribe(file:File, options:TranscribeOptions) {
    setLoading(Date.now())
    try {
      let res = await uploadAndTranscribe(file, options, onUploadProgress)
      setTranscribeProgress(1)
      onTranscript(res.transcript)
    }
    catch (e) {
      setError(e.toString())
    }
  }

  function onUploadProgress(progress:number) {
    // console.log("PROGRESS", progress)
    setUploadProgress(progress)
    if (progress >= 1) {
      console.log("UPLOADED")
      setUploaded(Date.now())
    }
  }

  let step;

  if (error) {
    step =
      <div className="text-red-500">
        <div className="font-bold">Error:</div>
        <div>{error}</div>
      </div>
  }

  else if (loading) {
    step = <Loading uploadProgress={uploadProgress} transcribeProgress={transcribeProgress}/>
  }

  else {
    step =
      <Transcribe
        file={selectedFile}
        onRemove={onRemoveFile}
        onTranscribe={runTranscribe}
      />

  }

  return (
    <>
      <Content>
        {step}
      </Content>
      <Sidebar>
        <FAQ/>
      </Sidebar>
    </>
  )
}


interface TranscribeProps {
  onTranscribe: (file: File, options: TranscribeOptions) => void;
  onRemove: () => void;
  file: File;
}

export const Transcribe:FC<TranscribeProps> = ({onTranscribe, onRemove, file}) =>  {

  const [punctuate, setPunctuate] = useState<boolean>(true)
  const [numerals, setNumerals] = useState<boolean>(true)

  function options():TranscribeOptions {
    return {
      punctuate: punctuate,
      numerals: numerals
    }
  }

  return (
    <>
      <div className="flex flex-row-wrapped gap-1">
        <button onClick={() => onRemove()}>
          <Icons.XCircle/>
        </button>
        <div className="grow">{file.name}</div>
        <div>{formatBytes(file.size)}</div>
      </div>
      <div className="flex flex-col">
        <Switch checked={punctuate} onChange={setPunctuate} label="Punctuate"/>
        <div className="italic">Adds punctuation and capitalization</div>
      </div>
      <div className="flex flex-col">
        <Switch checked={numerals} onChange={setNumerals} label="Numerals"/>
        <div className="italic">Converts numbers from written format to numerical format</div>
      </div>
      <button className={Style.button + "justify-center"} onClick={() => onTranscribe(file, options())}>
        <span>Transcribe Audio</span>
        <Icons.Right/>
      </button>
    </>
  )
}


// no, we need to give it multiple stages
export const Loading = ({uploadProgress = 0, transcribeProgress = 0}) => {
  let totalProgress = uploadProgress * 0.3 + transcribeProgress * 0.7
  let pcent = Math.ceil(totalProgress * 100)
  console.log("Loading", "upload=", uploadProgress, "trascript=", transcribeProgress, "pcent=", pcent)

  function message():string {
    if (transcribeProgress <= 0) {
      return "Uploading File..."
    } else {
      return "Transcribing..."
    }
  }

  return (
    <>
      <div className="mb-1 text-lg font-medium">{message()}</div>
      <div className="italic">Please do not refresh or close this window.</div>
      <div className="w-full h-4 mb-4 bg-gray rounded-full">
        <div className="h-4 bg-primary rounded-full animate-pulse transition-width linear duration-100" style={{"width": pcent + '%'}}></div>
      </div>
    </>
  )
}

export default Upload




function formatBytes(bytes:number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}