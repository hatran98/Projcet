const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide2");
const slide3 = document.querySelector(".slide3");
const listAccount = document.querySelector(".list-account");

slide2.addEventListener("click", function () {
  window.location.href = "./slide2.html";
});

slide3.addEventListener("click", function () {
  window.location.href = "./slide3.html";
});
let users = JSON.parse(localStorage.getItem("user"));

users.forEach((element) => {
  listAccount.innerHTML += `
    <div class="adl">
      <div>Name: ${element.name}</div>
      <div>Email: ${element.email}</div>
      <div>Password: ${element.password}</div>
      <div>ID: ${element.id}</div>
      <div>isLogin: ${element.isLogin}</div>
      <button class="btn-unlock ${element.block ? "" : "green"}">Unlock</button>
      <button class="btn-lock ${element.block ? "red" : ""}">Lock</button>
    </div>
  `;
});

let btnUnlock = document.querySelectorAll(".btn-unlock");
let btnLock = document.querySelectorAll(".btn-lock");

btnUnlock.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    users[index].block = false;
    users[index].isLogin = true;
    btn.classList.add("green"); // Ẩn nút Lock
    btnLock[index].classList.remove("red"); // Hiển thị nút Unlock
    localStorage.setItem("user", JSON.stringify(users));
  });
});

btnLock.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    users[index].block = true;
    users[index].isLogin = false;
    btn.classList.add("red"); // Ẩn nút Lock
    btnUnlock[index].classList.remove("green"); // Hiển thị nút Unlock
    localStorage.setItem("user", JSON.stringify(users));
  });
});
