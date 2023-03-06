import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout, Main, Sidebar } from './comp/Layout'
import './app.css'; //added line
import UploadBox from './view/Content';
import Transcript from './view/Transcript';
import TargetBox from './comp/TargetBox';

function App() {

  const [transcript, setTranscript] = useState<string | null>(null)

  let content;

  if (transcript) {
    content = <TargetBox><Transcript transcript={transcript}/></TargetBox>
  }
  else {
    content = <><UploadBox onTranscript={setTranscript}/></>
  }

  return (
    <Layout>
      <Main>
        <div className="p-4 gap-4 flex flex-col">
          <h1 className="font-bold">Badger Audio Transcription</h1>
          <p className="italic">Easily transcibe your audio and video files</p>
          {content}
        </div>
      </Main>
      <Sidebar>
        SIDEBAR
      </Sidebar>
    </Layout>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// console.log("WOOOTer1")
