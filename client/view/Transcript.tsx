import { ReactNode, FC, useEffect } from "react";
import { Content, Sidebar } from "../comp/Layout"
import TargetBox from "../comp/TargetBox";
import { FileInfo } from "../transcribe";
import * as Style from "../comp/Style"


interface Props {
  transcript: string
  file: FileInfo
  cancel():void
}

export const Transcript:FC<Props> = ({transcript, file, cancel}) => {

  return (
    <>
      <Content>
        <h1 className="font-bold">Transcript</h1>
        <pre>{JSON.stringify(file)}</pre>

        <div className="flex flex-row gap-4">
          <form action="/checkout" method="POST" className="m-0">
            <button type="submit" className={Style.button}>Checkout</button>
          </form>
          <button className={Style.button2} onClick={() => cancel()}>Cancel</button>
        </div>

        <TargetBox>
          <p>{transcript}</p>
        </TargetBox>
      </Content>

    </>
  )
}


export default Transcript;

