const btnPost = document.querySelector(".btn-post2");
const logout = document.querySelector("#logout");
const profile = document.querySelector("#myprofile");
const clickProfile = document.querySelector("#click-profile");
const clickProfile2 = document.querySelector("#click-profile2");
const imgProfile = document.querySelector("#img-profile");
const homePage = document.querySelector(".home-page");
const clickSearch = document.querySelector(".click-search");
const inputSearch = document.getElementById("input-search");
const hideColumn = document.querySelector(".hide-column");
const Col3 = document.querySelector(".col-3");
const displayName = document.querySelector(".display-name");
const editName = document.querySelector("#edit-name");
let user = JSON.parse(localStorage.getItem("user")) || [];

btnPost.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/Submit/index.html#";
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

profile.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/Profile_Posts/index.html";
});

homePage.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/HOME/9GAG.html";
});

clickSearch.addEventListener("click", function () {
  inputSearch.classList.toggle("hide");
});

hideColumn.addEventListener("click", function () {
  Col3.classList.toggle("hide");
});
user.forEach((element) => {
  if (element.isLogin == true) {
    editName.innerHTML = `<div class="field" id ="edit-name"><label>Display name</label><input type="text" name="fullName" maxlength="20" class="display-name" value="${element.name}">
    <p class="tips">This is the name that will be visible on your profile</p><!---->
  </div>`;
  }
});
