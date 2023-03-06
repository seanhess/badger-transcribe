
export async function uploadAndTranscribe(file:File):Promise<Result> {
  console.log("UPLOAD", file, file.name)
  const formData = new FormData();
  formData.append("upload", file)

  // TODO handle serverside error (HTML return format)
  const res = await fetch("/upload", {
    method: "post",
    body: formData,
  });
  const data = await res.json();
  return handleResults(data);
}

function handleResults(data:Result | ServerError):Result {
  if ((data as ServerError).error) {
    throw new Error((data as ServerError).error)
  }

  return data as Result
}

export type Result = { transcript: string }
type ServerError = { error: string }