const slider = document.querySelector('.card-slider');
const cards = document.querySelectorAll('.card');
const contents = document.querySelectorAll('.card-content');

const menuIcon = document.querySelector('.menu-icon');
const overlayMenu = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
  overlayMenu.classList.toggle('active');
});

const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', () => {
  overlayMenu.classList.remove('active');
});

// Theme
const themeToggle = document.querySelector('.theme-toggle');
let isLight = false;

themeToggle.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light-mode', isLight);
});





let currentIndex = 0;
let isStacked = false;

function updateSlider() {
  if (isStacked) return;

  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  contents.forEach((content) => {
    gsap.set(content, { opacity: 0, top: "66%" });
  });

  contents.forEach((content, index) => {
    if (index === currentIndex) {
      gsap.to(content, {
        top: 0,
        width: "100%",
        height: "100%",
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      });
    } else {
      gsap.to(content, {
        bottom: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power2.in"
      });
    }
  });
}

function swipeLeft() {
  if (isStacked) return;
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateSlider();
  }
}

function swipeRight() {
  if (isStacked) return;
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

// Drag/swipe handlers
let startX = 0;
let startY = 0;
let isDragging = false;

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx < -50) swipeLeft();
    else if (dx > 50) swipeRight();
  }

  isDragging = false;
});

// Optional: support touch devices
document.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  if (!isDragging) return;

  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx < -50) swipeLeft();
    else if (dx > 50) swipeRight();
  }

  isDragging = false;
});

// Initial load
updateSlider();
