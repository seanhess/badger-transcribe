import { ReactNode, useState, FC } from "react";
import TargetBox from "../comp/TargetBox"
import * as Style from "../comp/Style"
import * as Icons from "../comp/Icons"


// It's only the uploadbox if it doesn't have a file yet!
export const Content = () => {

  // we have decided to do some stuff!
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  let step;

  if (selectedFile) {
    step =
      <Transcribe
        file={selectedFile}
        onRemove={() => setSelectedFile(null)}
        onTranscribe={(f) => transcribe(f)}
      />

  } else {
    step = <Upload onFile={(f) => setSelectedFile(f)}/>
  }

  return (
    <TargetBox>{step}</TargetBox>
  )
}

function transcribe(file:File) {
  alert("TRANSCRIBE:" + file.name)
}

interface UploadProps {
  onFile: (file: File) => void;
}

export const Upload:FC<UploadProps> = ({onFile}) =>  {
  return (
    <>
      <label className={Style.button}>
        <Icons.Upload/>
        Choose Audio File
        <input type="file" className="invisible w-0 h-0" name="upload" onChange={(e) => onFile(e.target.files[0])}/>
      </label>
      <p>Max File Size 1GB</p>
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

export default Content




function formatBytes(bytes:number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}