import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './app.css'; //added line

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1 className="text-primary text-4xl font-bold test">{count}</h1>
      <button onClick={() => setCount(count + 1)} className="bg-red-500 hover:bg-slate-700 focus:outline-none">
        Increment
      </button>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Counter />);

// console.log("WOOOTer1")

// document.addEventListener("submit", function(event) {
//   event.preventDefault();
//   const file = document.getElementById("file") as HTMLInputElement
//   console.log("SUBMIT")
//   upload(file)
// })


// function upload(fileInput:HTMLInputElement) {
//   const formData = new FormData();

//   // TODO: required that a file is present
//   let file = fileInput.files[0]
//   console.log("FILE", file, file.name)

//   if (!file) {
//     console.error("No File Specified")
//     return
//   }

//   return

//   formData.append("upload", file)

//   // TODO handle serverside error (HTML return format)
//   fetch("/upload", {
//     method: "post",
//     body: formData,
//   })
//   // .catch((error) => console.error("Something went wrong!", error))
//   .then((res) => res.json())
//   .then((data) => showResults(data))
// }

// function showResults(data:Result | ServerError) {
//   document.getElementById('input').classList.add("dx")
//   if ((data as any).error) {
//     showError(data as ServerError)
//   }
//   else {
//     showTranscription(data as Result)
//   }
// }

// function showError(err:ServerError) {
//   let dom = document.getElementById('error')
//   dom.classList.remove('dx')
//   dom.innerHTML = "Error: " + err.error
// }

// function showTranscription(res:Result) {
//   console.log("Transcription", res)
//   let dom = document.getElementById('result')
//   dom.classList.remove('dx')
//   dom.innerText = res.transcript
// }

// type Result = { transcript: string }
// type ServerError = { error: string }