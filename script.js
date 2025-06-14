const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
})
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }

  // Mostrar el popup solo una vez por sesión
  window.onload = function () {
    if (!sessionStorage.getItem('popupShown')) {
      document.getElementById('popup').style.display = 'block';
      sessionStorage.setItem('popupShown', 'true');
    } else {
      document.getElementById('popup').style.display = 'none';
    }
  };
