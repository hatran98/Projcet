let user = JSON.parse(localStorage.getItem("user")) || [];
const nameProfile = document.querySelector(".nameprofile");
const emailProfile = document.querySelector(".emailprofile");
const imgProfile = document.querySelector("#img-profile");
const clickProfile = document.querySelector("#click-profile");
const clickProfile2 = document.querySelector("#click-profile2");
const myProfile = document.querySelector("#myprofile");
const logout = document.querySelector("#logout");
const homePage = document.querySelector(".home-page");
const hideColumn = document.querySelector(".hide-column");
const Col4 = document.querySelector(".col-4");
console.log(logout);
user.forEach((element) => {
  if (element.isLogin == true) {
    nameProfile.innerHTML = element.name;
    emailProfile.innerHTML = element.email;
  }
});

imgProfile.addEventListener("click", function () {
  user.forEach((element) => {
    if (element.isLogin == true) {
      clickProfile.classList.toggle("hide");
    } else {
      clickProfile2.classList.toggle("hide");
    }
  });
});

logout.addEventListener("click", function () {
  user.forEach((element) => {
    element.isLogin = false;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "http://127.0.0.1:5500/HOME/9GAG.html";
  });
});

myProfile.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/Profile_Posts/index.html";
});

homePage.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/HOME/9GAG.html";
});

hideColumn.addEventListener("click", function () {
  Col4.classList.toggle("hide");
});
