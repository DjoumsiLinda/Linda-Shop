window.onload=function() {
  var menu = document.querySelector(".menu");
  var overlay = document.querySelector("#overlay");
  var btnx = document.querySelector(".btnX");
  menu?.addEventListener("click", handlerMenu(overlay, menu));
  overlay?.addEventListener("click", handlerOverlay(overlay));
  btnx?.addEventListener("click", handlerBtnx(overlay, btnx));
}
function handlerMenu(overlay, menu) {
  menu.addEventListener("click", function () {
    overlay.classList.add("on");
  });
}
function handlerOverlay(overlay) {
  overlay.addEventListener("click", function () {
    overlay.classList.remove("on");
  });
}
function handlerBtnx(overlay, btnx) {
  btnx.addEventListener("click", function () {
    overlay.classList.remove("on");
  });
}
