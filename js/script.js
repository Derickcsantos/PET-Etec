let slideIndex = 0;

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dots = document.querySelectorAll('.dot');

document.querySelector('.next').addEventListener('click', () => {
  moveToNextSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
  moveToPrevSlide();
});

function moveToNextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  updateCarousel();
}

function moveToPrevSlide() {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function currentSlide(index) {
  slideIndex = index;
  updateCarousel();
}

function updateCarousel() {
  const offset = -slideIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;

  // Atualizar os indicadores
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === slideIndex);
  });
}

// Alternar automaticamente a cada 3 segundos
setInterval(() => {
  moveToNextSlide();
}, 3000);

// Função para definir o cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Define o tempo de expiração
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para obter um cookie
function getCookie(name) {
  let nameEq = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
  }
  return "";
}

// Verifica se o cookie de consentimento já foi definido
function checkCookieConsent() {
  let consent = getCookie("cookieConsent");
  if (consent != "") {
    document.getElementById("cookie-banner").style.display = "none"; // Se o consentimento foi dado, não exibe o banner
  } else {
    document.getElementById("cookie-banner").style.display = "block"; // Se não tiver consentimento, exibe o banner
  }
}

// Evento para aceitar os cookies
document.getElementById("accept-cookies").onclick = function() {
  setCookie("cookieConsent", "accepted", 365); // Define o cookie com validade de 365 dias
  document.getElementById("cookie-banner").style.display = "none"; // Fecha o banner após aceitar
}

// Chama a função para verificar o consentimento de cookies ao carregar a página
checkCookieConsent();

// Iniciar o carousel com o primeiro slide ativo
updateCarousel();
