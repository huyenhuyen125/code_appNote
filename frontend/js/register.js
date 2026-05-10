
// 1. DATA
let users = JSON.parse(localStorage.getItem("users")) || [];
let tags = JSON.parse(localStorage.getItem("tags")) || [];
let currentTab = "debt";
let editIndex = -1;


// 2. DOM
const nameUserTb = document.querySelector("#user");
const amountTb = document.querySelector("#amount");
const reasonTb = document.querySelector("#reason");
const dateTb = document.querySelector("#date");
const saveBtn = document.querySelector("#saveBtn");
const userList = document.querySelector(".user-list");
const userNewScr = document.querySelector("#userNewScr");
const userListScr = document.querySelector("#userListScr");
const userDetailScr = document.querySelector("#userDetailScr");
const emailError = document.querySelector("#emailError");
const passError = document.querySelector("#passError");
const addBtn = document.querySelector("#addBtn");
const tabItemDebt = document.querySelector("#debt");
const tabItemLoan = document.querySelector("#loan");
const tagsList = document.querySelector(".tags");

// const addTagbtn = document.querySelector("#addTagbtn");
const popup = document.querySelector("#popup");
// const openPopupBtn = document.querySelector("#openPopupBtn");
const closePopupBtn = document.querySelector("#closePopupBtn");

// 3. SAVE
function save() {
  localStorage.setItem("users", JSON.stringify(users));
};

function saveTag() {
  localStorage.setItem("tags", JSON.stringify(tags));
};


function userValidate(nameValue, amountValue) {
  let isValid = true;
  if (!nameValue || !amountValue) {
    emailError.textContent = "⚠ Tên không được để trống";
    passError.textContent = "⚠ Số tiền không được để trống";
    isValid = false;
    return isValid;
  }
  return isValid;

}
// 5. LOGIC
function addUser() {
  const nameValue = nameUserTb.value;
  const amountValue = Number(amountTb.value);
  const reasonValue = reasonTb.value;
  let dateValue = dateTb.value;

  if (!dateValue) {
    const today = new Date();
    dateValue = new Date().toISOString().split("T")[0];
  }

  const isValid = userValidate(nameValue, amountValue);
  if (!isValid) return;
  // reset error

  const user = {
    id: editId
      ? Number(editId)
      : Date.now(),
    userName: nameValue,
    amount: amountValue,
    reason: reasonValue,
    createdAt: new Date().toISOString(),
    amdate: dateValue,
    type: currentTab

  };

  if (editId) {

    const index = users.findIndex(
      item => item.id == editId
    );

    users[index] = user;
    localStorage.removeItem("editId");
  }

  // ===== CREATE =====
  else {
    users.push(user);
  }
  save();
  if (user.type === "debt") {
    renderAvata("debt");
  } else {
    renderAvata("loan");
  }

  // addAvate();
  nameUserTb.value = "";
  amountTb.value = "";
  reasonTb.value = "";
  dateTb.value = "";
};


// 4. RENDER
function renderAvata(type) {
  const uniqueUsers = [];
  const debtUsers = users.filter(user => user.type === type);

  debtUsers.forEach(user => {
    const isExist = uniqueUsers.find(u => u.userName === user.userName);

    if (!isExist) {
      uniqueUsers.push(user);
    }
  });

  uniqueUsers.forEach((user) => {
    const div = document.createElement("div");
    div.className = "user avatar";
    div.setAttribute("data-name1", user.userName);
    div.innerHTML = `
      <img src="../image/images.jpg" >
      <p>${user.userName}</p>
    `;
    userList.appendChild(div);
  });
};

function addTags() {
  const tagInput = document.querySelector("#popupInput");
  let tagInputValue = tagInput.value.trim().toLowerCase();
  const tagNameError = document.querySelector("#tagNameError");

  if (tagInputValue === "") {
    tagNameError.textContent = "⚠ Tag name không được để trống";
    return;
  }

  const isExist = tags.find(tag => tag.tagName.toLowerCase() === tagInputValue);

  if (isExist) {
    tagNameError.textContent = "⚠ Tag name đã tồn tại";
    return;
  };

  tagNameError.textContent = "";
  const tag = {
    tagName: tagInputValue,
    type: currentTab
  };
  tags.push(tag);
  saveTag();
  tagInput.value = "";
  popup.style.display = "none";
};


function renderTags(type) {

  tagsList.innerHTML = "";
  tagsList.innerHTML = `
      <button class="item_tag" id="addTagbtn">➕ Add</button>
    `;
  const filteredTags = tags.filter(tag => tag.type === type);
  // if(!filteredTags) return ;
  filteredTags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "item_tag";
    span.textContent = tag.tagName;

    // tạo nút xóa
    const remove = document.createElement("span");
    remove.className = "remove_tag";
    remove.textContent = " ✕ ";


    span.setAttribute("data-tag", tag.tagName);
    span.appendChild(remove);
    tagsList.appendChild(span);
  });
}

// 6. EVENT();
renderAvata("debt");
renderTags("debt");

const editId = localStorage.getItem("editId");
if (editId) {
  console.log("đang edit");

  const userEdit = users.find(
    item => item.id == editId
  );

  if (userEdit) {

    nameUserTb.value = userEdit.userName;

    amountTb.value = userEdit.amount;

    reasonTb.value = userEdit.reason;

    dateTb.value = userEdit.amdate;
    currentTab = userEdit.type;

    renderAvata(currentTab);

    // active đúng tab
    if (currentTab === "debt") {

      tabItemDebt.classList.add("active");
      tabItemLoan.classList.remove("active");

    } else {

      tabItemLoan.classList.add("active");
      tabItemDebt.classList.remove("active");

    }
  }

}


saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addUser();
  //local
  // window.location.href = "../index.html";
  //đẩy lên
   window.location.href = "/index.html";
});


userList.addEventListener("click", (e) => {
  const userDiv = e.target.closest(".user.avatar");
  if (!userDiv) return;
  //  nếu lick ko vào avata thì closest = nulll => lỗi nên phải chặn
  // và mục đích userDiv => là tìm thằng con rồi đi ra thằng cha. dù có lick vào con hay cha vẫn được
  const name2 = userDiv.dataset.name1;
  nameUserTb.value = name2;

});




tagsList.addEventListener("click", (e) => {
  // case 1: click add button
  if (e.target.closest("#addTagbtn")) {
    popup.style.display = "flex";
    return;
  }


  const removeBtn = e.target.closest(".remove_tag");

  if (removeBtn) {
    const tagItem = removeBtn.closest(".item_tag");
    const tagName = tagItem.dataset.tag;

    tags = tags.filter(
      item => item.tagName !== tagName
    );
    saveTag();
    tagItem.remove();
    return;
  }


  // ===== CLICK TAG (fill vào input) =====
  const tag = e.target.closest(".item_tag");
  if (!tag) return;

  const tag_name = tag.dataset.tag;
  reasonTb.value = tag_name;



})


tabItemDebt.addEventListener("click", () => {
  tabItemLoan.classList.remove("active")
  tabItemDebt.classList.add("active");

  currentTab = "debt";
  renderAvata(currentTab);
  renderTags(currentTab);

});

tabItemLoan.addEventListener("click", () => {
  tabItemDebt.classList.remove("active")
  tabItemLoan.classList.add("active");
  currentTab = "loan";
  renderAvata(currentTab);
  renderTags(currentTab);
})


closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";

});

const savePopupBtn = document.querySelector("#savePopupBtn");


savePopupBtn.addEventListener("click", () => {
  addTags();

  renderTags(currentTab);

});


amountTb.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});


userNewScr.addEventListener("click", () => {
  // window.location.href = "../html/register.html";

  // dẩy lên
  //  window.location.href = "html/register.html";
  window.location.reload();
})

userListScr.addEventListener("click", () => {
  localStorage.removeItem("editId");
  // window.location.href = "../index.html";

  window.location.href = "/index.html";
})

// userDetailScr.addEventListener("click", () => {
//   // window.location.href = "../html/register.html";
//    window.location.href = "html/register.html";
// })


//  window.location.href = "html/register.html";




// localStorage.clear();

// users = [];
