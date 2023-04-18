import { ReactNode, useState, FC } from "react";
import * as Style from "../comp/Style"
import * as Icons from "../comp/Icons"
import { Content, Sidebar, Contents, Panel } from "../comp/Layout"
import FAQ from "../comp/FAQ"
import { unitPrice } from "../checkout";
import { Transcript } from "../data/TranscriptHistory";
import { FileInfo } from "../data/file";
import { FileInfoFields } from "../comp/FileRow";

export enum FileError {
  TooBig
}

export const MAX_FILE_SIZE = 10*1000000


export function fileError(file:File | undefined) {
  // console.log("FILE", file, file && file.size, MAX_FILE_SIZE)
  if (!file) return null
  else if (file.size > MAX_FILE_SIZE)
    return FileError.TooBig
}

interface Props {
  onFile(file:File):void;
  fileError:FileError | undefined;
  purchases:Transcript[]
  loadPurchase(transcript:Transcript):void
}

export const ChooseFile:FC<Props> = ({onFile, fileError, purchases, loadPurchase}) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <>
      <Contents>
        <Panel>
          <p>Easily transcibe your audio and video files. Only {unitPrice()}</p>

          <label className={Style.button}>
            <Icons.Upload/>
            Choose Audio File
            <input type="file" name="upload" 
              accept={FORMATS.map((f) => "." + f).join(',')}
              className="invisible w-0 h-0"
              onChange={(e) => onFile(e.target.files[0])}
              />
          </label>
          <p className="text-sm">Audio Only. Max File Size 100mb.</p>
          <p className="text-sm">
            <a className="underline cursor-pointer text-blue-500"
              href="https://www.freeconvert.com/convert/video-to-mp3"
              target="_blank">
                Try this free tool
            </a>
            <span> to convert your video files to MP3.</span>
            </p>
          <Errors error={fileError}/>
        </Panel>
        <Panel>
          <div>Purchased Transcripts</div>
          {purchases.map((t) => <Purchase key={t.file.name} load={loadPurchase} transcript={t}/>)}
        </Panel>
      </Contents>
      <Sidebar>
        <FAQ/>
      </Sidebar>
    </>
  )
}

interface PurchaseProps {
  transcript:Transcript
  load(transcript:Transcript):void
}

const Purchase:FC<PurchaseProps> = ({transcript, load}) => {
  return (
    <button onClick={() => load(transcript)} className={Style.button2}>
      <FileInfoFields file={transcript.file}/>
    </button>
  )
}

const Errors:FC<{error:FileError}> = ({error}) => {
  switch(error) {
    case FileError.TooBig:
      return (
        <div className='bg-red-500 rounded p-4 text-white'>
            <span>File Too Large. </span>
            <a className="underline cursor-pointer"
              href="https://www.freeconvert.com/convert/video-to-mp3"
              target="_blank">
                Try compressing the audio file
            </a>
        </div>
      )
    default:
      return <></>
  }


}

export default ChooseFile


let FORMATS =
  ["mp3", "aac", "wav", "flac", "m4a"]

