export default function searchOnGoogle(text) {
  const encodedText = encodeURIComponent(text);
  const searchUrl = `https://www.google.com/search?q=${encodedText}`;
  window.open(searchUrl, "_blank");
}
