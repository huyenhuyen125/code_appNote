
// 1. DATA
let users = JSON.parse(localStorage.getItem("users")) || [];
let isValid = true;
let editIndex = -1;



// 2. DOM
const totalDebt = document.querySelector("#total-debt");
const totalLoan = document.querySelector("#total-loan");
const addUserBtn = document.querySelector("#addBtn");
const userNewScr = document.querySelector("#userNewScr");
const userListScr = document.querySelector("#userListScr");
const userDetailScr = document.querySelector("#userDetailScr");
const debtList = document.querySelector("#debt-list");



// 3. SAVE
function save() {
  localStorage.setItem("users", JSON.stringify(users));
};

function sumTotalDebt() {
  const debtUsers = users.filter(user => user.type === "debt");
  let sum = 0;
  debtUsers.forEach(user => {
    sum += Number(user.amount);
  });
  return sum;
};

function sumTotalLoan() {
  const loanUsers = users.filter(user => user.type === "loan");
  let sum = 0;
  loanUsers.forEach(user => {
    sum += Number(user.amount);
  });
  return sum;
};


// 4. RENDER
function renderDebt() {
  const sum = sumTotalDebt();
  totalDebt.innerHTML = "";
  totalDebt.innerHTML = `
       TỔNG TÔI NỢ: - ${sum}đ
    `;

};

function renderLoan() {
  const sum = sumTotalLoan();
  totalLoan.innerHTML = "";
  totalLoan.innerHTML = `
       TỔNG CHO VAY:  ${sum}đ
    `;

};

function formatDate(dateString) {

  return new Date(dateString)
    .toLocaleDateString("vi-VN");

}



function renderDebtList() {
  debtList.innerHTML = "";
  users.forEach(user => {

    if (user.type === "debt") {
      debtList.innerHTML += `
       <div class="card"  data-id=${user.id} >
        <img src="image/images.jpg">
        <div class="info" >
          <div class="name">${user.userName}</div>
          <div class="desc">${user.reason}</div>
        </div>
         <div class="info detail">
          <div class="date">${formatDate(user.amdate)}</div>
          <div class="money red"> - ${user.amount} đ </div>
        </div>  
        <div class="delete-btn" > ✕ </div>
       </div>
    `;
    } if (user.type === "loan") {
      debtList.innerHTML += `
       <div class="card" data-id=${user.id}>
        <img src="image/images.jpg">
        <div class="info">
          <div class="name">${user.userName}</div>
          <div class="desc">${user.reason}</div>
        </div>
         <div class="info detail">
          <div class="date">${formatDate(user.amdate)}</div>
          <div class="money green"> + ${user.amount} đ </div>
       </div>
           <div class="delete-btn" > ✕ </div>
       </div>
    `;
    }

  })

};



users.sort((a, b) => {

  // so sánh ngày user nhập
  const dateCompare =
    new Date(b.amdate) - new Date(a.amdate);

  // nếu khác ngày
  if (dateCompare !== 0) {
    return dateCompare;
  }

  // nếu cùng ngày
  return new Date(b.createdAt) - new Date(a.createdAt);

});


renderDebt();
renderLoan();
renderDebtList();



debtList.addEventListener("click", (e) => {

  // ===== CLICK DELETE =====
  const deleteBtn =
    e.target.closest(".delete-btn");


  if (deleteBtn) {

    const userItem =
      deleteBtn.closest(".card");
    const id =
      Number(userItem.dataset.id);

    users = users.filter(
      item => item.id !== id
    );

    save();
    renderDebt();
    renderLoan();
    renderDebtList();
    return;
  }


  // ===== CLICK CARD => EDIT =====
  const userItem =
    e.target.closest(".card");

  if (!userItem) return;

  const userID =
    userItem.dataset.id;

  localStorage.setItem(
    "editId",
    userID
  );

  window.location.href =
    "html/register.html";

});

addUserBtn.addEventListener("click", () => {
  window.location.href = "html/register.html";
})

userNewScr.addEventListener("click", () => {
  window.location.href = "html/register.html";

})

userListScr.addEventListener("click", () => {
  // window.location.href = "html/index.html";
    window.location.reload();
})

// userDetailScr.addEventListener("click", () => {
//   window.location.href = "html/register.html";
// })





// users = [];
// localStorage.clear();