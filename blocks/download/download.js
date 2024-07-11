export default function decorate(block) {
  const downloadLink = block.querySelector('.button-container a');
  downloadLink.setAttribute('download', '');
}
