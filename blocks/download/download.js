export default function decorate(block) {
  const downloadLink = block.querySelector('.button-container a');
  if (downloadLink) {
    downloadLink.setAttribute('download', '');
  }
}
