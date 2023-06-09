const slide1 = document.querySelector(".admin1");
const slide2 = document.querySelector(".slide2");
const slide3 = document.querySelector(".slide3");
const account = document.querySelector("#staticEmail");
const password = document.querySelector("#inputPassword");
const btnLogin = document.querySelector(".btn-login");
slide1.addEventListener("click", function () {
  window.location.href = "./admin.html";
});

let admin = JSON.parse(localStorage.getItem("admin"));
let user = {
  user: "admin",
  password: "admin",
};
localStorage.setItem("admin", JSON.stringify(user));
btnLogin.addEventListener("click", function () {
  if (account.value == admin.user && password.value == admin.password) {
    admin.login = true;
    window.location.href = "./slide2.html";
  }
});

if (admin.login != false) {
  slide2.addEventListener("click", function () {
    window.location.href = "./slide2.html";
  });

  slide3.addEventListener("click", function () {
    window.location.href = "./slide3.html";
  });
}
