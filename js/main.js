// Manejo del menú
const menu = document.querySelector("#menu");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const menuItems = document.querySelectorAll("#menu .lista-menu a");

abrir.addEventListener("click", () => {
  menu.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  menu.classList.remove("visible");
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("visible");
  });
});
