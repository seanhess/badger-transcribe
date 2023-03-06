import { ReactNode, FC } from "react";

interface Props {
  transcript: string
}

export const Transcript:FC<Props> = ({transcript}) => {
  return (
    <>
      <h1 className="font-bold">Transcript</h1>
      <p>{transcript}</p>
    </>
  )
}

export default Transcript;
