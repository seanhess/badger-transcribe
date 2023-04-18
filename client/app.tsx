import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout, Content, Sidebar } from './comp/Layout'
import './app.css'; //added line
import ChooseFile, {fileError} from './view/ChooseFile';
import Transcribed from './view/Transcribed';
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
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  

  function createTranscript(t:string) {

    // If they are in trail mode, go straight to download
    transcriptHistory.add({transcript: t, file: fileInfo(selectedFile)})
    setTranscript(t)

    if (window.location.pathname == '/try' && transcriptHistory.allPurchases()?.length == 0) {
      console.log("GO FREE TRIAL!")
      setIsPurchased(true)
    }
  }

  function onFile(file:File) {
    setSavedFileInfo(fileInfo(file))
    setSelectedFile(file)
  }

  function cancelTranscript() {
    transcriptHistory.remove()
    setTranscript(null)
    setSavedFileInfo(null)
    setSelectedFile(null)
    window.history.replaceState({}, "", "/")
    setIsPurchased(false)
    setPurchases(transcriptHistory.allPurchases())
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
    console.log("LOAD", trans?.file)
    setPurchases(transcriptHistory.allPurchases())

    console.log("CHECKING PURCHASED")
    setIsPurchased(window.location.pathname == '/payment/success')
  }, [])

  let content;

  if (isPurchased && savedFileInfo) {
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

