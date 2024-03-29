



export type Mb = number
export type Bytes = number

export type FileInfo = {
  size: Bytes
  name: string
}

export function fileInfo(file:File):FileInfo {
  return {
  size: file.size,
    name: file.name
  }
}

export function fileSizeMb(file:FileInfo):Mb {
  return file.size / (1000 * 1000)
}


export function formatBytes(bytes:Bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  // this was 1024, but that's not true!
  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}