export default function decorate(block) {
  const elements = block.querySelectorAll('p');
  const image = document.createElement('div');
  const titleh1 = document.createElement('h1');

  const img = elements[0];
  image.innerHTML = img.innerHTML;
  img.parentNode.replaceChild(image, img);
  image.classList.add('image');

  const title = elements[1];
  titleh1.innerHTML = title.innerHTML;
  title.parentNode.replaceChild(titleh1, title);
}
