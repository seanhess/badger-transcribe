import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout, Content, Sidebar } from './comp/Layout'
import './app.css'; //added line
import ChooseFile from './view/ChooseFile';
import Transcript from './view/Transcript';
import Upload from './view/Upload';
import { fileInfo } from './transcribe';

console.log("loaded")

type Mb = number
type FileInfo = {
  size: Mb
  name: string
}

function App() {

  const [transcript, setTranscript] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [savedFileInfo, setSavedFileInfo] = useState<FileInfo | null>(null)

  function createTranscript(t:string) {
    localStorage.setItem('transcript', t)
    setTranscript(t)
  }

  function onFile(file:File) {
    localStorage.setItem('file', JSON.stringify(fileInfo(file)))
    setSelectedFile(file)
  }

  function cancelTranscript() {
    localStorage.removeItem('transcript')
    localStorage.removeItem('file')
    setTranscript(null)
    setSelectedFile(null)
    setSavedFileInfo(null)
  }

  useEffect(() => {
    let transcript = localStorage.getItem('transcript')
    console.log("local transcript:", transcript != null)
    setTranscript(transcript)

    let file:FileInfo = JSON.parse(localStorage.getItem('file'))
    setSavedFileInfo(file)
  })


  let content;

  if (transcript) {
    content = <Transcript transcript={transcript} file={savedFileInfo} cancel={cancelTranscript}/>
  }
  else if (selectedFile) {
    content =
      <Upload
        selectedFile={selectedFile}
        onRemoveFile={() => setSelectedFile(null)}
        onTranscript={createTranscript}
        // onTranscript={() => null}
      />
  }
  else {
    content = <ChooseFile onFile={onFile}/>
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

