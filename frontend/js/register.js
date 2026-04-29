const STORAGE_KEY = "debts";
const USER_KEY = "users";

// ===== GET/SET =====
function getDebts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveDebts(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USER_KEY)) || [];
}

function saveUsers(data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
}

// ===== TẠO USER MẶC ĐỊNH =====
function initDefaultUsers() {
  const users = getUsers();

  if (users.length === 0) {
    const defaultUsers = [
      {
        name: "Tùng",
        avatar: "../image/images.jpg"
      },
      {
        name: "Lan",
        avatar: "../image/images.jpg"
      },
      {
        name: "Quán cơm",
        avatar: "../image/images.jpg"
      }
    ];

    saveUsers(defaultUsers);
  }
}

// ===== CLICK AVATAR =====
function bindAvatarClick() {
  document.querySelectorAll(".avatar").forEach(el => {
    el.onclick = () => {
      const name = el.getAttribute("data-name");
      document.getElementById("user").value = name;
    };
  });
}

// ===== RENDER USER =====
function renderUsers() {
  const users = getUsers();
  const container = document.querySelector(".user-list");

  // reset
  container.innerHTML = `<div class="user add">+</div>`;

  users.forEach(u => {
    const div = document.createElement("div");
    div.className = "user avatar";
    div.setAttribute("data-name", u.name);

    div.innerHTML = `
      <img src="${u.avatar}">
      <p>${u.name}</p>
    `;

    container.appendChild(div);
  });

  bindAvatarClick();
}

// ===== SUBMIT =====
function handleSubmit() {
  const user = document.getElementById("user").value;
  const amount = Number(document.getElementById("amount").value);
  const reason = document.getElementById("reason").value;
  const date = document.getElementById("date").value;

  if (!user || !amount) {
    alert("Thiếu thông tin!");
    return;
  }

  let users = getUsers();

  // nếu user chưa tồn tại → thêm mới
  const exist = users.find(u => u.name === user);

  if (!exist) {
    users.push({
      name: user,
      avatar: `https://i.pravatar.cc/50?u=${user}`
    });
    saveUsers(users);
  }

  // lưu debt
  const debts = getDebts();

  debts.push({
    user,
    amount,
    reason,
    date
  });

  saveDebts(debts);

  // chuyển trang
  window.location.href = "index.html";
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {

  initDefaultUsers();   // 🔥 QUAN TRỌNG
  renderUsers();

  document.querySelector(".save").onclick = handleSubmit;

  // NAV
  document.querySelectorAll(".nav-item")[0].onclick = () => {
    window.location.href = "register.html";
  };

  document.querySelectorAll(".nav-item")[1].onclick = () => {
    window.location.href = "index.html";
  };

  // default date
  document.getElementById("date").valueAsDate = new Date();

  // chỉ nhập số
  document.getElementById("amount").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
});