export const isValidImageUrl = (url: string) => {
  return url.startsWith("http")
}

export const decodeHtml = (html: string) => {
  const textArea = document.createElement("textarea")
  textArea.innerHTML = html
  return textArea.value
}
