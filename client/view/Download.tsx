import { FC, useEffect } from "react";
import * as Style from "../comp/Style"
import * as Icons from "../comp/Icons"
import { FileInfo } from "../data/file";
import { Content, Sidebar } from "../comp/Layout"
import { FileRow } from "../comp/FileRow"
import { saveAs } from 'file-saver'
import { Transcript } from "../data/TranscriptHistory"

interface Props {
  transcript:string
  file:FileInfo
  startOver():void
  purchased(trans:Transcript):void
}

export const Download:FC<Props> = ({transcript, file, startOver, purchased}) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function download() {
    var blob = new Blob([transcript], {type: "text/plain;charset=utf-8"});
    saveAs(blob, file.name + ".transcript.txt");
  }

  function remove() {
    purchased({transcript:transcript, file:file})
    startOver()
  }

  function copyTranscript() {
    navigator.clipboard.writeText(transcript)
      .then(() => alert("Copied Transcript to Clipboard"))
  }

  // Split paragraphs
  let paragraphs = transcript.trim().split(/\n+/g)

  return (
    <>
      <Content>
        <h1 className="font-bold text-2xl">Purchase Successful</h1>
        <p>Click the button below to download your transcript</p>
        <FileRow file={file} onRemove={remove} />
        <div className="flex flex-row gap-2">
          <button className={Style.button} onClick={download}>Download Full Transcript</button>
          <button className={Style.button2} onClick={remove}>Start Over</button>
        </div>
        <div className="bg-gray-light p-10 border-dashed border-4 border-gray gap-4 flex flex-col relative">
          <button onClick={copyTranscript} className="cursor-pointer absolute right-2 top-2 text-gray-dark"><Icons.Copy/></button>
          { paragraphs.map((p, i) => <p key={i}>{p}</p>) }
        </div>
      </Content>
    </>
  )
}

export default Download


