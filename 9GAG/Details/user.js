let user = JSON.parse(localStorage.getItem("user")) || [];
let isFriend = JSON.parse(localStorage.getItem("isfriend")) || {};
const nameProfile = document.querySelector(".nameprofile");
const emailProfile = document.querySelector(".emailprofile");
const imgProfile = document.querySelector("#img-profile");
const clickProfile = document.querySelector("#click-profile");
const clickProfile2 = document.querySelector("#click-profile2");
const myProfile = document.querySelector("#myprofile");
const logout = document.querySelector("#logout");
const homePage = document.querySelector(".home-page");
const hideColumn = document.querySelector(".hide-column");
const Col3 = document.querySelector(".col-3");
const btnPost = document.querySelector(".btn-post");
const btnPost2 = document.querySelector(".btn-post2");
const clickSearch = document.querySelector(".click-search");
const inputSearch = document.getElementById("input-search");
const More = document.querySelector(".more");
const clickMore = document.querySelector(".click-more");
const editProfile = document.querySelector(".edit-profile");
const copyLink = document.querySelector(".copy-link");
const profileBlank = document.querySelector(".profile-blank");
const titleContent = document.querySelector(".title-post");
const imgContent = document.querySelector(".img-post");
const contentPost = document.querySelector(".content-post");
const mailPost = document.querySelector("mail-post");
const postContent = document.querySelector(".post-content");
const listInvate = document.querySelector(".list-invate");
let isuser = JSON.parse(localStorage.getItem("isuser"));
nameProfile.innerHTML = isuser.name;
emailProfile.innerHTML = isuser.email;

imgProfile.addEventListener("click", function () {
  user.forEach((element) => {
    if (element.isLogin == true) {
      clickProfile.classList.toggle("hide");
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
  Col3.classList.toggle("hide");
});
let check = -1;

btnPost2.addEventListener("click", function () {
  user.forEach((element, index) => {
    if (element.isLogin == true) {
      check = index;
    }
  });
  if (check == -1) {
    signUpModal.show();
  } else {
    window.location.href = "http://127.0.0.1:5500/Submit/index.html#";
  }
});

clickSearch.addEventListener("click", function () {
  inputSearch.classList.toggle("hide");
});

let posts = JSON.parse(localStorage.getItem("posts")) || [];
let loginUser = JSON.parse(localStorage.getItem("loginUser"));
let myPosts = posts.filter((e) => e.idUser == isuser.id);
myPosts.reverse().forEach((element) => {
  let htmlText = "";
  profileBlank.classList.add("hide");
  let comment = JSON.parse(localStorage.getItem("comments")) || [];
  let myComment = comment.filter((item) => item.postID == element.id);
  myComment.reverse().forEach((myComment) => {
    htmlText += `
    <div class ="commentsx">
<span class="deleteCmt" onclick="deleteComment('${myComment.id}')">
<i class="bi bi-x-circle"></i>
</span>
<div><img class="img-profile2" src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" /> <span class="user-comment">${myComment.email}</span>
<div class = "content-comment">${myComment.content}</div></div>
</div>`;
  });
  if (element.img !== undefined && element.img !== "") {
    postContent.innerHTML += `<div class="post" id="${element.idUser}">
    <div class="mail-post"><img class="img-profile2" src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" /> ${element.email}</div><span class="close-btn" onclick="deletePost('${element.id}', '${element.idUser}')"><i class="bi bi-x-circle"></i></span>
    <div class="title-post">${element.title}</div>
    <div class="img-post">
    <img src="${element.img}"</div>
    <div class ="content-post">#${element.content}</div>
    <input class="input-comment"/><button class="btn-comment" data-id="${element.id}" onclick="commentPost('${element.idUser}', '${element.id}', this)">Comment</button>
    <div class="list-comment" >${htmlText}</div>
  </div>`;
  } else {
    postContent.innerHTML += `<div class="post" id="${element.idUser}">
    <div class="mail-post"><img class="img-profile2" src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" /> ${element.email}</div><span class="close-btn" onclick="deletePost('${element.id}', '${element.idUser}')"><i class="bi bi-x-circle"></i></span>
    <div class="title-post">${element.title}</div>
    <div class="img-post">
    ${element.text}</div>
    <div class ="content-post">#${element.content}</div>
    <input class="input-comment"/><button class="btn-comment" data-id="${element.id}" onclick="commentPost('${element.idUser}', '${element.id}', this)">Comment</button>
    <div class="list-comment" >${htmlText}</div>
  </div>`;
  }
});

let btnComments = document.querySelectorAll(".btn-comment");
let comments = JSON.parse(localStorage.getItem("comments")) || [];

function commentPost(idUser, idPost, button) {
  let div = button.closest("div");
  let input = div.querySelector(".input-comment");
  let list = div.querySelector(".list-comment");
  let inputContent = input.value;
  let listComment = list;
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.forEach((element) => {
    if (element.idUser == idUser && element.id == idPost) {
      let index = posts.findIndex(
        (post) => post.id == idPost && post.idUser == idUser
      );
      let CommentIn = inputContent;
      comments.push({
        id: Math.floor(Math.random() * 1000000),
        postID: idPost,
        idUser: loginUser.id,
        email: loginUser.email,
        content: CommentIn,
      });
      localStorage.setItem("comments", JSON.stringify(comments));
      updateCommentList(idPost, listComment);
    }
  });
  input.value = "";
}

function updateCommentList(postId, listComment) {
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  let postComments = comments.filter((comment) => comment.postID == postId);
  listComment.innerHTML = "";
  postComments.reverse().forEach((comment) => {
    listComment.innerHTML += `
    <div class ="commentsx">
    <span class="deleteCmt" onclick="deleteComment('${comment.id}')">
    <i class="bi bi-x-circle"></i>
    </span>
    <div><img class="img-profile2" src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" /> <span class="user-comment">${comment.email}</span>
    <div class = "content-comment">${comment.content}</div></div>
    </div>`;
  });
}
function deleteComment(id) {
  let index = comments.findIndex(
    (deletes) => deletes.id == id && deletes.idUser == loginUser.id
  );

  if (index !== -1) {
    // Đối tượng myDelete tồn tại trong mảng comments
    comments.splice(index, 1); // Xóa đối tượng khỏi mảng
    localStorage.setItem("comments", JSON.stringify(comments)); // Cập nhật Local Storage
  }
  window.location.reload();
}

let Friends = JSON.parse(localStorage.getItem("friends"));
let friendRequests = JSON.parse(localStorage.getItem("friendRequests")) || [];
