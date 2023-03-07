import { ReactNode, useState, FC } from "react";
import * as Style from "../comp/Style"
import * as Icons from "../comp/Icons"
import { Content, Sidebar } from "../comp/Layout"

interface Props {
  onFile(file:File):void;
}

export const ChooseFile:FC<Props> = ({onFile}) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <>
      <Content>
        <h1 className="font-bold">Badger Audio Transcription</h1>
        <p className="italic">Easily transcibe your audio and video files</p>

        <label className={Style.button}>
          <Icons.Upload/>
          Choose Audio File
          <input type="file" className="invisible w-0 h-0" name="upload" onChange={(e) => onFile(e.target.files[0])}/>
        </label>
        <p>Max File Size 1GB</p>
      </Content>
      <Sidebar>
        Upload Sidebar
      </Sidebar>
    </>
  )
}

export default ChooseFile

