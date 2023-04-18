import { FC, ReactNode } from "react";
import * as Icons from "../comp/Icons"
import { FileInfo, formatBytes } from "../data/file";

interface Props {
  file: FileInfo
  onRemove?():void
}

export const FileRow:FC<Props> = ({file, onRemove}) => {

  let btn = <></>
  if (onRemove) {
    btn = <button onClick={onRemove}><Icons.XCircle/></button>
  }
  return (
    <FileRowContainer>
      {btn}
      <FileInfoFields file={file}/>
    </FileRowContainer>
  )
}


export const FileRowContainer:FC<{children:ReactNode}> = ({children}) => {
  return (
    <div className="flex flex-row-wrapped gap-2">
      {children}
    </div>
  )
}

export const FileInfoFields:FC<{file:FileInfo}> = ({file}) => {
  return (
    <>
      <div className="grow text-left">{file.name}</div>
      <div>{formatBytes(file.size)}</div>
    </>
  )
}
