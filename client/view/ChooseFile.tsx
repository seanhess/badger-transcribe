import { ReactNode, useState, FC } from "react";
import * as Style from "../comp/Style"
import * as Icons from "../comp/Icons"
import { Content, Sidebar } from "../comp/Layout"
import FAQ from "../comp/FAQ"
import { unitPrice } from "../checkout";

interface Props {
  onFile(file:File):void;
}

export const ChooseFile:FC<Props> = ({onFile}) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <>
      <Content>
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
        {/* <p>Max File Size 1GB</p> */}
      </Content>
      <Sidebar>
        <FAQ/>
      </Sidebar>
    </>
  )
}

export default ChooseFile


let FORMATS =
  ["mp2", "mp3", "mp4", "aac", "wav", "flac", "m4a", "mpeg"]

