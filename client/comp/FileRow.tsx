import { FC } from "react";
import * as Icons from "../comp/Icons"
import { FileInfo, formatBytes } from "../file";

interface Props {
  file: FileInfo
  onRemove():void
}

export const FileRow:FC<Props> = ({file, onRemove}) => {
  return (
    <>
      <div className="flex flex-row-wrapped gap-2">
        <button onClick={onRemove}>
          <Icons.XCircle/>
        </button>
        <div className="grow">{file.name}</div>
        <div>{formatBytes(file.size)}</div>
      </div>
    </>
  )
}

export default FileRow;

