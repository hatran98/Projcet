const clickSearch = document.querySelector(".click-search");
const inputSearch = document.getElementById("input-search");
const hideColumn = document.querySelector(".hide-column");
const Col4 = document.querySelector(".col-3");
const Col2 = document.querySelector(".col-2");
const registerForm = document.querySelector("#register-form");
const errorContainer = document.querySelector(".error");
const errorContainer2 = document.querySelector(".error2");
const loginForm = document.querySelector("#login-form");
const nameValue = document.querySelector("#exampleInputName1");
const passValue = document.querySelector("#exampleInputPassword1");
const emailValue = document.querySelector("#exampleInputEmail1");
const modalSignup = document.querySelector("#form-signup");
const navUnderline = document.querySelector(".nav-underline");
const navLink = document.querySelectorAll(".nav-link");
const passValue2 = document.querySelector("#exampleInputPassword2");
const emailValue2 = document.querySelector("#exampleInputEmail2");
const nameProfile = document.querySelector("#signup-signin");
const imgProfile = document.querySelector("#img-profile");
const clickProfile = document.querySelector("#click-profile");
const clickProfile2 = document.querySelector("#click-profile2");
const profile = document.querySelector("#profile");
const logout = document.querySelector("#logout");
const SignupSignin = document.querySelector("#regis-login");
const homePage = document.querySelector(".home-page");
const Card = document.querySelector(".card");
const btnPost = document.querySelector(".btn-post");
const listInvate = document.querySelector(".list-invate");
let error = "";
let user = JSON.parse(localStorage.getItem("user")) || [];
const loginModal = new bootstrap.Modal("#form-login", {
  keyboard: false,
});
const signUpModal = new bootstrap.Modal("#form-signup", {
  keyboard: false,
});
document.getElementById("link-login").addEventListener("click", function () {
  signUpModal.hide();
  loginModal.show();
});
document.getElementById("link-signup").addEventListener("click", function () {
  signUpModal.show();
  loginModal.hide();
});
document.getElementById("signup-signin").addEventListener("click", function () {
  signUpModal.show();
  loginModal.hide();
});
clickSearch.addEventListener("click", function () {
  inputSearch.classList.toggle("hide");
  Friendslist.classList.toggle("hide");
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    inputSearch.classList.add("hide");
    Friendslist.classList.remove("hide");
    hideSearchResults();
  }
});

hideColumn.addEventListener("click", function () {
  Col4.classList.toggle("hide");
});
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = registerForm.email.value;
  let password = registerForm.password.value;
  let name = registerForm.fullname.value;
  error = "";
  let nameRegex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  let passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!passRegex.test(password)) {
    error =
      error +
      `Password không hợp lệ!! <br/>
    Password phải có 8 ký tự trở lên...`;
  }
  if (!emailRegex.test(email)) {
    error =
      error +
      `Email không hợp lệ !! <br/>
    Email phải chứa @`;
  }
  if (!nameRegex.test(name)) {
    error = error + `Tên không hợp lệ !!`;
  }
  if (error) {
    errorContainer.classList.remove("hide");
    errorContainer.innerHTML = error;
  } else {
    errorContainer.classList.add("hide");
    errorContainer.innerHTML = error;
  }
  if (
    emailRegex.test(email) &&
    passRegex.test(password) &&
    nameRegex.test(name)
  ) {
    error = "";
    let newUser = {
      id: Math.floor(Math.random() * 100000),
      name: name,
      email: email,
      password: password,
      isLogin: false,
      listFriends: [],
      block: false,
    };
    let check = true;

    user.forEach((element) => {
      if (element.email == email || user == []) {
        check = false;
      }
    });
    if (check == true) {
      user.push(newUser);
      localStorage.setItem("user", JSON.stringify(user));
      signUpModal.hide();
      loginModal.show();
    } else if (check == false) {
      error = error + `Email đã sử dụng`;
    }
    if (error) {
      errorContainer.classList.remove("hide");
      errorContainer.innerHTML = error;
    } else {
      errorContainer.classList.add("hide");
      errorContainer.innerHTML = error;
    }
    nameValue.value = "";
    emailValue.value = "";
    passValue.value = "";
  }
});
modalSignup.addEventListener("hidden.bs.modal", (event) => {
  error = "";
  errorContainer.innerHTML = error;
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = loginForm.email.value;
  let password = loginForm.password.value;
  error = "";
  let passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!passRegex.test(password)) {
    error = error + `Password phải có 8 ký tự trở lên...`;
  }
  if (!emailRegex.test(email)) {
    error =
      error +
      `Email không hợp lệ !! <br/>
    Email phải chứa @`;
  }
  if (error) {
    errorContainer2.classList.remove("hide");
    errorContainer2.innerHTML = error;
  } else {
    errorContainer2.classList.add("hide");
    errorContainer2.innerHTML = error;
  }
  // Đăng nhập thành công
  if (emailRegex.test(email) && passRegex.test(password)) {
    error = "";
    user.forEach((element) => {
      if (
        element.email == email &&
        element.password == password &&
        element.block == false
      ) {
        element.isLogin = true;
        localStorage.setItem("user", JSON.stringify(user));

        let newLogin = {
          id: element.id,
          name: element.name,
          email: element.email,
          password: element.password,
          isLogin: element.isLogin,
          listFriends: element.listFriends,
          block: element.block,
        };
        localStorage.setItem("loginUser", JSON.stringify(newLogin));

        // logic check neu co login user
      }
      if (element.isLogin == true) {
        nameProfile.classList.add("hide");
        loginModal.hide();
        listInvate.classList.remove("hide");
        Friendslist.classList.remove("hide");
        clickSearch.classList.remove('hide')
        window.location.reload();
      }
      if (error) {
        errorContainer2.classList.remove("hide");
        errorContainer2.innerHTML = error;
      } else {
        errorContainer2.classList.add("hide");
        errorContainer2.innerHTML = error;
      }
    });
    emailValue2.value = "";
    passValue2.value = "";
  }
});
window.onload = function () {
  user.forEach((element) => {
    if (element.isLogin == true) {
      listInvate.classList.remove("hide");
      Friendslist.classList.remove("hide");
      nameProfile.classList.add("hide");
      Card.classList.add("hide");
      addFriend.classList.remove("hide");
      removeFriend.classList.remove("hide");
      clickSearch.classList.remove('hide')
    }
  });
};
let check = -1;
imgProfile.addEventListener("click", function () {
  user.forEach((element, index) => {
    if (element.isLogin == true) {
      check = index;
    }
  });
  if (check == -1) {
    clickProfile2.classList.toggle("hide");
  } else {
    clickProfile.classList.toggle("hide");
  }
});
profile.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/Profile_Posts/index.html";
});

logout.addEventListener("click", function () {
  user.forEach((element) => {
    element.isLogin = false;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "http://127.0.0.1:5500/HOME/9GAG.html";
  });
  localStorage.removeItem("loginUser");
});

SignupSignin.addEventListener("click", function () {
  signUpModal.show();
  clickProfile2.classList.toggle("hide");
});

homePage.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/HOME/9GAG.html";
});

btnPost.addEventListener("click", function () {
  user.forEach((element) => {
    if (element.isLogin == true) {
      window.location.href = "http://127.0.0.1:5500/Submit/index.html#";
    } else {
      signUpModal.show();
    }
  });
});
let content = document.querySelector(".content");
let friends = JSON.parse(localStorage.getItem("friends")) || [];
let posts = JSON.parse(localStorage.getItem("posts")) || [];
// điều kiện -> đang là tài khoản loginUser
// hiện ra tất cả bài viết của danh sách bạn bè của emaillogin
posts.reverse().forEach((post) => {
  let comment = JSON.parse(localStorage.getItem("comments")) || [];
  let myComment = comment.filter((isComment) => isComment.postID == post.id);
  let htmlText = "";
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
  if (post.img !== undefined && post.img !== "") {
    content.innerHTML += `<div class="post" id="${post.idUser}">
      <div class="mail-post"><img class="img-profile2" src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" /> ${post.email}</div><span class="close-btn" onclick="deletePost('${post.id}', '${post.idUser}')"><i class="bi bi-x-circle"></i></span>
      <div class="title-post">${post.title}</div>
      <div class="img-post">
      <img src="${post.img}"</div>
      <div class ="content-post">#${post.content}</div>
      <input class="input-comment"/><button class="btn-comment" data-id="${post.id}">Comment</button>
      <div class ="list-comment" id="comment-section">${htmlText}</div>
    </div>`;
  } else {
    content.innerHTML += `<div class="post" id="${post.idUser}">
      <div class="mail-post"><img class="img-profile2" src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" /> ${post.email}</div>
      <span class="close-btn" onclick="deletePost('${post.id}',${post.idUser})"><i class="bi bi-x-circle"></i>
      </span>
      <div class="title-post">${post.title}</div>
      <div class="img-post">${post.text}</div>
      <div class ="content-post">#${post.content}</div>
      <input class="input-comment"/><button class="btn-comment" data-id="${post.id}">Comment</button>
      <div class="list-comment">${htmlText}</div>
    </div>`;
  }
});
let loginUser = JSON.parse(localStorage.getItem("loginUser"));

let btnComments = document.querySelectorAll(".btn-comment");
let listComment = document.querySelectorAll(".list-comment");
let inputComment = document.querySelectorAll(".input-comment");
let comments = JSON.parse(localStorage.getItem("comments")) || [];
btnComments.forEach((element) => {
  element.addEventListener("click", function (e) {
    let postID = e.target.dataset.id;
    let index = posts.findIndex((post) => post.id == postID);
    if (index >= 0) {
      let CommentIn = inputComment[index].value.trim();
      if (CommentIn.length > 0) {
        let commentList = listComment[index];
        // Thêm comment mới vào mảng comments
        comments.push({
          id: Math.floor(Math.random() * 1000000),
          postID: postID,
          idUser: loginUser.id,
          email: loginUser.email,
          content: CommentIn,
        });
        // Lưu lại mảng comments vào localStorage
        localStorage.setItem("comments", JSON.stringify(comments));
        // Hiển thị tất cả các comment của post tương ứng
        let postComments = comments.filter(
          (comment) => comment.postID === postID
        );
        let commentsHTML = "";
        postComments.reverse().forEach((comment) => {
          commentsHTML += `
          <div class ="commentsx">
          <span class="deleteCmt" onclick="deleteComment('${comment.id}')">
          <i class="bi bi-x-circle"></i>
          </span>
          <div><img class="img-profile2" src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" /> <span class="user-comment">${comment.email}</span>
  <div class = "content-comment">${comment.content}</div></div>
  </div>`;
          commentList.innerHTML = commentsHTML;
          inputComment[index].value = "";
        });
      }
    }
  });
});

const addFriend = document.querySelector(".addfriend-btn");
const removeFriend = document.querySelector(".removefriend-btn");
const Friendslist = document.querySelector(".list-friend");
let friendRequests = JSON.parse(localStorage.getItem("friendRequests")) || [];
addFriend.addEventListener("click", function () {
  const email = prompt("Nhập vào địa chỉ email người dùng");
  let check = false;
  user.forEach((user) => {
    if (user.email == email && email && user.email !== loginUser.email) {
      // Kiểm tra xem yêu cầu kết bạn đã tồn tại hay chưa
      let requestExists = friends.some(
        (request) =>
          request.emailadd === user.email &&
          request.emaillogin === loginUser.email
      );

      if (!requestExists) {
        let newfriends = {
          id: Math.floor(Math.random() * 1000000),
          emailadd: user.email,
          idAdd: user.id,
          nameAdd: user.name,
          emaillogin: loginUser.email,
          idLogin: loginUser.id,
          nameLogin: loginUser.name,
          status: "pending",
        };

        friendRequests.push(newfriends);
        localStorage.setItem("friendRequests", JSON.stringify(friendRequests));
      } else {
        alert("Đã là bạn bè");
      }

      check = true;
    }
  });

  if (!check) {
    alert("Email không hợp lệ  - bạn không thể tự kết bạn với chính mình");
  }
});
// Hiển thị danh sách lời mời kết bạn trên giao diện web
friendRequests.forEach((request) => {
  if (request.emailadd === loginUser.email && request.status == "pending") {
    listInvate.innerHTML += `

    <ul>
      <li>Email:${request.emaillogin} </li>
      <li>Status: ${request.status}</li>
      <button class="accept-btn">Chấp nhận</button>
      <button class="reject-btn">Từ chối</button>
    </ul>`;
  }
});

// Khi ấn vào nút accept thì sẽ đẩy lên local ->
const accept = document.querySelectorAll(".accept-btn");
accept.forEach((btn) => {
  btn.addEventListener("click", function () {
    const requestIndex = [...accept].indexOf(btn);
    friendRequests[requestIndex].status = "accept";

    // Cập nhật trạng thái của yêu cầu kết bạn
    friends.push(friendRequests[requestIndex]); // Thêm thông tin về bạn mới được chấp nhận vào danh sách bạn bè
    localStorage.setItem("friends", JSON.stringify(friends)); // Lưu lại danh sách bạn bè vào local storage

    friendRequests.splice(requestIndex, 1); // Xóa yêu cầu kết bạn vừa được chấp nhận khỏi danh sách yêu cầu kết bạn
    localStorage.setItem("friendRequests", JSON.stringify(friendRequests));

    listInvate.innerHTML = ""; // Xóa danh sách yêu cầu kết bạn hiện tại trên giao diện web

    // Hiển thị lại danh sách yêu cầu kết bạn sau khi đã chấp nhận
    friendRequests.forEach((request) => {
      if (
        request.emailadd === loginUser.email &&
        request.status === "pending"
      ) {
        listInvate.innerHTML += `
        <ul>
          <li>Email:${request.emaillogin} </li>
          <li>Status: ${request.status}</li>
          <button class="accept-btn">Chấp nhận</button>
          <button class="reject-btn">Từ chối</button>
        </ul>`;
      }
    });
  });
});
const reject = document.querySelectorAll(".reject-btn");
reject.forEach((rej) => {
  rej.addEventListener("click", function () {
    const requestIndex = [...reject].indexOf(rej);
    if (friendRequests[requestIndex].emailadd === loginUser.email) {
      friendRequests.splice(requestIndex, 1);
      localStorage.setItem("friendRequests", JSON.stringify(friendRequests));
      listInvate.innerHTML = "";
      friendRequests.forEach((request) => {
        if (
          request.emailadd === loginUser.email &&
          request.status === "pending"
        ) {
          listInvate.innerHTML += `
        <ul>
          <li>Email:${request.emaillogin} </li>
          <li>Status: ${request.status}</li>
          <button class="accept-btn">Chấp nhận</button>
          <button class="reject-btn">Từ chối</button>
        </ul>`;
        }
      });
    }
  });
});
const listFriends = friends.filter(
  (friend) => friend.emaillogin == loginUser.email
);
listFriends.forEach((friend) => {
  Friendslist.innerHTML += `

            <div class="user-id" )">${friend.id}</div>
<div class="email-user" onclick="getFriend('${friend.emailadd}')">${friend.emailadd}
</div>
            `;
});

const listFriends2 = friends.filter(
  (friend) => friend.emailadd == loginUser.email
);
listFriends2.forEach((friend) => {
  Friendslist.innerHTML += `
  <div class="user-id">${friend.id}</div>
  <div class="email-user" onclick="getFriend('${friend.emaillogin}')">${friend.emaillogin}</div>
  `;
});

removeFriend.addEventListener("click", function () {
  const idToRemove = prompt("Nhập vào id muốn xoá");

  // Tìm vị trí của phần tử cần xoá trong mảng friends
  let indexToRemove = friends.findIndex((friend) => friend.id == idToRemove);

  // Kiểm tra xem indexToRemove có hợp lệ hay không
  if (
    indexToRemove !== -1 &&
    (friends[indexToRemove].idAdd === loginUser.id ||
      friends[indexToRemove].idLogin === loginUser.id)
  ) {
    friends.splice(indexToRemove, 1);
    localStorage.setItem("friends", JSON.stringify(friends));
  } else {
    alert("Không tìm thấy bạn bè có id tương ứng");
  }
});
function deleteComment(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || {};
  posts.forEach((posts) => {
    let index = comments.findIndex(
      (deletes) =>
        deletes.id == id &&
        deletes.idUser == loginUser.id &&
        deletes.postID == posts.id
    );
    if (index !== -1) {
      // Đối tượng myDelete tồn tại trong mảng comments
      comments.splice(index, 1); // Xóa đối tượng khỏi mảng
      localStorage.setItem("comments", JSON.stringify(comments)); // Cập nhật Local Storage
      location.reload();
    }
  });
}
let isFriend = JSON.parse(localStorage.getItem("isfriend")) || {};
function getFriend(email) {
  friends.forEach((friend) => {
    if (loginUser.email == friend.emaillogin && email == friend.emailadd) {
      let newFriend = {
        email: email,
        id: friend.idAdd,
        name: friend.nameAdd,
        isLogin: true,
      };
      localStorage.setItem("isfriend", JSON.stringify(newFriend));
    }
    if (loginUser.email == friend.emailadd && email == friend.emaillogin) {
      let newFriend = {
        email: email,
        id: friend.idLogin,
        name: friend.nameLogin,
        isLogin: true,
      };
      localStorage.setItem("isfriend", JSON.stringify(newFriend));
    }
    window.location.href = "http://127.0.0.1:5500/Details/index.html";
  });
}

let searchResults = document.getElementById("search-results");
inputSearch.addEventListener("input", function () {
  let searchValue = inputSearch.value.toLowerCase();

  // Lọc người dùng theo tên/email
  let filteredUsers = user.filter((user) => {
    let userEmail = user.email.toLowerCase();
    return userEmail.includes(searchValue);
  });

  // Hiển thị kết quả tìm kiếm
  displaySearchResults(filteredUsers);
});

function displaySearchResults(results) {
  searchResults.innerHTML = "";

  if (results.length > 0) {
    results.forEach((users) => {
      let userElement = document.createElement("div");
      let userLink = document.createElement("a");
      userLink.textContent = `Email: ${users.email}`;
      userLink.href = `#`;
      userLink.addEventListener("click", function () {
        if (users.email == loginUser.email) {
          window.location.href =
            "http://127.0.0.1:5500/Profile_Posts/index.html";
        } else {
          let isUser = {
            email: users.email,
            id: users.id,
            name: users.name,
          };
          localStorage.setItem("isuser", JSON.stringify(isUser));
          window.location.href = `http://127.0.0.1:5500/Details/user.html`;
        }
      });

      userElement.appendChild(userLink);
      searchResults.appendChild(userElement);
    });
  } else {
    let noResultsElement = document.createElement("div");
    noResultsElement.textContent = "No results found.";

    searchResults.appendChild(noResultsElement);
  }
}
function hideSearchResults() {
  searchResults.innerHTML = "";
  inputSearch.value = "";
}

function deletePost(id, idUser) {
  let posts = JSON.parse(localStorage.getItem("posts"));
  posts.forEach((post) => {
    if (post.id == id && post.idUser == loginUser.id) {
      let myDelete = posts.filter(
        (item) => item.id != id && idUser == loginUser.id
      );
      localStorage.setItem("posts", JSON.stringify(myDelete));
      location.reload();
    }
  });
}
