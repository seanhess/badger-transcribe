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

  fetch("/upload", {
    method: "post",
    body: formData,
  })
  // .catch((error) => console.error("Something went wrong!", error))
  .then((res) => res.json())
  .then((data) => console.log("DATA", data))
}
