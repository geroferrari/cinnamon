const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
})
menuCloseButton.addEventListener("click", () => menuOpenButton.click());


// document.addEventListener("DOMContentLoaded", () => {
//     const carousels = document.querySelectorAll(".carousel-container");

//     carousels.forEach(container => {
//       const images = container.querySelector(".carousel-images");
//       const imageCount = images.children.length;
//       let index = 0;

//       const updateCarousel = () => {
//         const containerWidth = container.offsetWidth;
//         images.style.transform = `translateX(-${index * containerWidth}px)`;
//       };

//       container.querySelector(".next").addEventListener("click", () => {
//         index = (index + 1) % imageCount;
//         updateCarousel();
//       });

//       container.querySelector(".prev").addEventListener("click", () => {
//         index = (index - 1 + imageCount) % imageCount;
//         updateCarousel();
//       });

//       // Por si cambia el tamaño del viewport
//       window.addEventListener("resize", updateCarousel);

//       // Inicializamos
//       updateCarousel();
//     });
//   });