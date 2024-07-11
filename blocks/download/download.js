export default function decorate(block) {
  const downlaodLink = block.querySelector('.button-container a');
  if (downlaodLink) {
    downlaodLink.setAttribiute('download', '');
  }
}
