import { ReactNode, useState, FC } from "react";
import TargetBox from "../comp/TargetBox"
import * as Style from "../comp/Style"
import * as Icons from "../comp/Icons"
import { Content, Sidebar } from "../comp/Layout"
import { uploadAndTranscribe, Result } from "../transcribe"

interface Props {
  selectedFile: File
  onTranscript: (t:string) => void
  onRemoveFile: () => void
}

export const Upload:FC<Props> = ({onTranscript, onRemoveFile, selectedFile}) => {

  const [isLoading, setLoading] = useState<Boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // report the results of the transcription
  async function runTranscribe(file:File) {
    setLoading(true)
    try {
      let res = await uploadAndTranscribe(file)
      onTranscript(res.transcript)
    }
    catch (e) {
      setError(e.toString())
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

  else if (isLoading) {
    step = <Icons.Spinner fill={"#727CF5"} size={128}/>
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
        <TargetBox>{step}</TargetBox>
      </Content>
      <Sidebar>sidebar</Sidebar>
    </>
  )
}


interface TranscribeProps {
  onTranscribe: (file: File) => void;
  onRemove: () => void;
  file: File;
}

export const Transcribe:FC<TranscribeProps> = ({onTranscribe, onRemove, file}) =>  {
  return (
    <>
      <div className="flex flex-row-wrapped gap-1">
        <button onClick={() => onRemove()}>
          <Icons.XCircle/>
        </button>
        <div className="grow">{file.name}</div>
        <div>{formatBytes(file.size)}</div>
      </div>
      <button className={Style.button + "justify-center"} onClick={() => onTranscribe(file)}>
        <span>Transcribe Audio</span>
        <Icons.Right/>
      </button>
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