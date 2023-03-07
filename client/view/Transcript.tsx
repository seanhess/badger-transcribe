import { ReactNode, FC } from "react";
import { Content, Sidebar } from "../comp/Layout"
import TargetBox from "../comp/TargetBox";

interface Props {
  transcript: string
}

export const Transcript:FC<Props> = ({transcript}) => {
  return (
    <>
      <Content>
        <TargetBox>
          <h1 className="font-bold">Transcript</h1>
          <p>{transcript}</p>
        </TargetBox>
      </Content>

    </>
  )
}

export default Transcript;
