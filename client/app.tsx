import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout, Content, Sidebar } from './comp/Layout'
import './app.css'; //added line
import ChooseFile, {fileError} from './view/ChooseFile';
import Transcribed from './view/Transcript';
import Upload from './view/Upload';
import Download from './view/Download';
import { fileInfo } from './data/file';
import { TranscriptHistory, Transcript } from "./data/TranscriptHistory"

console.log("loaded")

type Mb = number
type FileInfo = {
  size: Mb
  name: string
}

const transcriptHistory = new TranscriptHistory()

function App() {

  const [transcript, setTranscript] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [savedFileInfo, setSavedFileInfo] = useState<FileInfo | null>(null)
  const [purchases, setPurchases] = useState<Transcript[]>([])
  

  function createTranscript(t:string) {
    transcriptHistory.add({transcript: t, file: fileInfo(selectedFile)})
    setTranscript(t)
  }

  function onFile(file:File) {
    setSavedFileInfo(file)
    setSelectedFile(file)
  }

  function cancelTranscript() {
    transcriptHistory.remove()
    setTranscript(null)
    setSavedFileInfo(null)
    setSelectedFile(null)
    window.location.pathname = "/"
  }

  function purchased(t:Transcript) {
    transcriptHistory.purchased(t)
  }

  function loadPurchase(t:Transcript) {
    transcriptHistory.add(t)
    window.location.pathname = '/payment/success'
  }

  useEffect(() => {
    let trans = transcriptHistory.transcript()
    setTranscript(trans?.transcript)
    setSavedFileInfo(trans?.file)
    setPurchases(transcriptHistory.allPurchases())
  }, [])

  let path = window.location.pathname
  let content;

  if (path == '/payment/success' && savedFileInfo) {
    content = <Download transcript={transcript} file={savedFileInfo} startOver={cancelTranscript} purchased={purchased}/>
  }
  else if (transcript) {
    content = <Transcribed transcript={transcript} file={savedFileInfo} cancel={cancelTranscript}/>
  }
  else if (selectedFile && fileError(selectedFile) === undefined) {
    content =
      <Upload
        selectedFile={selectedFile}
        onRemoveFile={() => setSelectedFile(null)}
        onTranscript={createTranscript}
        // onTranscript={() => null}
      />
  }
  else {
    content = <ChooseFile loadPurchase={loadPurchase} onFile={onFile} fileError={fileError(selectedFile)} purchases={purchases}/>
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

