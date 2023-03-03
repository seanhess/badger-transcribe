import { Server } from "http";

console.log("WOOOTer")

document.addEventListener("submit", function(event) {
  event.preventDefault();
  const file = document.getElementById("file") as HTMLInputElement
  console.log("SUBMIT")
  upload(file)
})


function upload(fileInput:HTMLInputElement) {
  const formData = new FormData();

  // TODO: required that a file is present
  let file = fileInput.files[0]

  if (!file) {
    console.error("No File Specified")
    return
  }

  formData.append("upload", file)

  // TODO handle serverside error (HTML return format)
  fetch("/upload", {
    method: "post",
    body: formData,
  })
  // .catch((error) => console.error("Something went wrong!", error))
  .then((res) => res.json())
  .then((data) => showResults(data))
}

function showResults(data:Result | ServerError) {
  document.getElementById('input').classList.add("dx")
  if ((data as any).error) {
    showError(data as ServerError)
  }
  else {
    showTranscription(data as Result)
  }
}

function showError(err:ServerError) {
  let dom = document.getElementById('error')
  dom.classList.remove('dx')
  dom.innerHTML = "Error: " + err.error
}

function showTranscription(res:Result) {
  console.log("Transcription", res)
  let dom = document.getElementById('result')
  dom.classList.remove('dx')
  dom.innerText = res.transcript
}

type Result = { transcript: string }
type ServerError = { error: string }