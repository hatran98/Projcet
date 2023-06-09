const expandBorder = document.querySelector(".accordion-flush");
const clickRule = document.querySelector(".click-rule");
const uploadContent = document.querySelector(".upload-content");
const uploadText = document.querySelector(".upload-text");
const imageVideo = document.querySelector(".image-video");
const postText = document.querySelector(".post-text");
const btnPost = document.querySelector(".btn-post");
const logout = document.querySelector("#logout");
const profile = document.querySelector("#myprofile");
const clickProfile = document.querySelector("#click-profile");
const clickProfile2 = document.querySelector("#click-profile2");
const imgProfile = document.querySelector("#img-profile");
const homePage = document.querySelector(".home-page");
const clickSearch = document.querySelector(".click-search");
const inputSearch = document.getElementById("input-search");
let loginUser = JSON.parse(localStorage.getItem("loginUser"));
let user = JSON.parse(localStorage.getItem("user")) || [];
clickRule.addEventListener("click", function () {
  expandBorder.classList.toggle("cssreset");
  clickRule.classList.toggle("cssreset2");
  clickRule.classList.toggle("cssreset3");
});

imageVideo.addEventListener("click", function () {
  uploadContent.style.display = "block";
  uploadText.style.display = "none";
});
postText.addEventListener("click", function () {
  uploadContent.style.display = "none";
  uploadText.style.display = "block";
});

btnPost.addEventListener("click", function () {
  window.location.href = "./index.html";
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
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let comment = JSON.parse(localStorage.getItem("comment")) || [];
let newPosts = JSON.parse(localStorage.getItem("newPosts"));
const textArea = document.querySelector("#textarea");
const textInput = document.querySelector("#text-input");
const textArea1000 = document.querySelector("#textarea1000");
const contentInput = document.querySelector("#input-content");
const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", function () {
  let title = textArea.value;
  let img = textInput.value;
  let content = contentInput.value;
  let text = textArea1000.value;

  if (
    (title.length >= 4 && img.length >= 4 && content.length >= 4) ||
    (title.length >= 4 && text.length >= 4 && content.length >= 4)
  ) {
    let newPost = {
      id: Math.floor(Math.random() * 100000),
      title: title,
      img: img,
      content: content,
      idUser: loginUser.id,
      email: loginUser.email,
      text: text,
    };
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    window.location.href = "http://127.0.0.1:5500/Profile_Posts/index.html";
  }
});
