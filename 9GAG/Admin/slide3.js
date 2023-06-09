const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide2");
const slide3 = document.querySelector(".slide3");
const listPosts = document.querySelector(".list-post");
slide2.addEventListener("click", function () {
  window.location.href = "./slide2.html";
});

slide3.addEventListener("click", function () {
  window.location.href = "./slide3.html";
});

let posts = JSON.parse(localStorage.getItem("posts"));
function renderPosts() {
  listPosts.innerHTML = ""; // Xóa nội dung danh sách bài viết hiện tại

  posts.forEach((element) => {
    let postElement = document.createElement("div");
    postElement.classList.add("adl");

    let emailElement = document.createElement("div");
    emailElement.textContent = `Email: ${element.email}`;
    postElement.appendChild(emailElement);

    let idElement = document.createElement("div");
    idElement.textContent = `idPost: ${element.id}`;
    postElement.appendChild(idElement);

    let contentElement = document.createElement("div");
    contentElement.textContent = `Content: ${element.content}`;
    postElement.appendChild(contentElement);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn-delete");
    postElement.appendChild(deleteButton);

    listPosts.appendChild(postElement);
  });
}

renderPosts();

let btnDelete = document.querySelectorAll(".btn-delete");

btnDelete.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    posts.splice(index, 1); // Xóa phần tử tương ứng trong mảng posts
    localStorage.setItem("posts", JSON.stringify(posts)); // Cập nhật Local Storage
    renderPosts(); // Cập nhật lại danh sách bài viết
  });
});
