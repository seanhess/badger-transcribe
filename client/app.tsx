import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout, Content, Sidebar } from './comp/Layout'
import './app.css'; //added line
import ChooseFile from './view/ChooseFile';
import Transcript from './view/Transcript';
import Upload from './view/Upload';
import { uploadAndTranscribe, Result } from "./transcribe"
import TargetBox from './comp/TargetBox';

console.log("loaded")

function App() {

  const [transcript, setTranscript] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  let content;

  if (transcript) {
    content = <Transcript transcript={transcript}/>
  }
  else if (selectedFile) {
    content =
      <Upload
        selectedFile={selectedFile}
        onRemoveFile={() => setSelectedFile(null)}
        onTranscript={(t) => setTranscript(t)}
      />
  }
  else {
    content = <ChooseFile onFile={setSelectedFile}/>
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

