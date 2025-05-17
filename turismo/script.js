const carouselImages = document.getElementById('carousel-images');
const images = carouselImages.children;
const imageWidth = 300;
const gap = 20;
let currentIndex = 0;

function autoSlide() {
  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  const offset = -(currentIndex * (imageWidth + gap));
  carouselImages.style.transform = `translateX(${offset}px)`;
}

setInterval(autoSlide, 3000);