import { FileInfo, fileInfo } from './file';

export type Transcript = {
  transcript: string
  file: FileInfo
}

export class TranscriptHistory {

  transcript():Transcript {
    return JSON.parse(localStorage.getItem('transcript'))
  }

  add(transcript:Transcript) {
    localStorage.setItem('transcript', JSON.stringify(transcript))
  }

  remove() {
    localStorage.removeItem('transcript')
  }

  purchased(transcript:Transcript) {
    console.log("PURCHASED", transcript.file)
    let purchases = this.purchases()
    purchases[transcript.file.name] = transcript
    localStorage.setItem('purchases', JSON.stringify(purchases))
  }

  purchases():{[file:string]:Transcript} {
    return JSON.parse(localStorage.getItem('purchases')) || {}
  }

  allPurchases():Transcript[] {
    return Object.values(this.purchases())
  }
}