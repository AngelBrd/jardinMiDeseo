AOS.init();

// Función para cambiar la clase del encabezado al hacer scroll
window.addEventListener("scroll", function() {
  var header = document.getElementById("header");
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollPosition > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


const menu = document.querySelector(".bars-menu")

menu.addEventListener("click", animateBars);

let line1 = document.querySelector(".line1_bars-menu");
let line2 = document.querySelector(".line2_bars-menu")
let line3 = document.querySelector(".line3_bars-menu")

function animateBars() {
    line1.classList.toggle("active_line1_bars-menu");
    line2.classList.toggle("active_line2_bars-menu");
    line3.classList.toggle("active_line3_bars-menu");
}

const sectionMenu = document.querySelector(".section-menu")
const body = document.querySelector(".body")
const paquetes = document.querySelector(".paquetes")
const galeria = document.querySelector(".galeria")
const contactanos = document.querySelector(".contactanos")

    menu.addEventListener("click", () => {
    sectionMenu.classList.toggle("nav-menu_visible")
    body.classList.toggle("body-overflow_hidden")
    });

        paquetes.addEventListener("click", () => {
        sectionMenu.classList.remove("nav-menu_visible")
        body.classList.toggle("body-overflow_hidden")
        animateBars()
    });
    
        galeria.addEventListener("click", () => {
        sectionMenu.classList.remove("nav-menu_visible")
        body.classList.remove("body-overflow_hidden")
        animateBars()
    });
    
        contactanos.addEventListener("click", () => {
        sectionMenu.classList.remove("nav-menu_visible")
        body.classList.remove("body-overflow_hidden")
        animateBars()
    });

        if (sectionMenu.classList.contains("nav-menu_visible")) {
            menu.setAttribute("aria-label", "Cerrar menu");
        } else {
            menu.setAttribute("aria-label", "Abrir menu");
        }

        // const slides = document.querySelectorAll('.slide');
        // let currentSlide = 0;
        // let intervalId;
        
        // function showSlide(index) {
        //   slides[currentSlide].className = 'slide';
        //   currentSlide = (index + slides.length) % slides.length;
        //   slides[currentSlide].className = 'slide active';
        // }
        
        // function nextSlide() {
        //   showSlide(currentSlide + 1);
        // }
        
        // function prevSlide() {
        //   showSlide(currentSlide - 1);
        // }
        
        // document.getElementById('nextBtn').addEventListener('click', () => {
        //   clearInterval(intervalId);
        //   nextSlide();
        // });
        
        // document.getElementById('prevBtn').addEventListener('click', () => {
        //   clearInterval(intervalId);
        //   prevSlide();
        // });
        
        // intervalId = setInterval(nextSlide, 2000);
        