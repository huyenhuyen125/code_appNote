// let loan = document.getElementById("loan");
// let dect = document.querySelector("#dect");

// loan.addEventListener("click", () => {
//     loan.textContent = "đã click vào tôi nợ"
// });

// dect.addEventListener("click", () => {
//     alert("hihi bạn ")
// });

// let increase = document.querySelector("#increase");
// let decrease = document.querySelector("#decrease");
// let count = document.querySelector("#count");
// let sum = 0;

// increase.addEventListener("click", () => {
//     count.textContent = ++sum;
// })

// decrease.addEventListener("click", () => {
//     count.textContent = --sum;
// })


// let users = JSON.parse(localStorage.getItem("users")) || [];
// const inputname = document.getElementById("name");
// const inputage = document.getElementById("age");
// const add = document.getElementById("add");
// // const deleteUsers = document.getElementById("delete");
// const update = document.getElementById("update");
// const list = document.getElementById("list");
// const table_user = document.getElementById("table_user");
// const list_table = document.getElementById("list_table");

// let editIndex = -1;

// function saveUser() {
//     localStorage.setItem("users", JSON.stringify(users));
// }

// function render() {
//     let html = "";
//     users.forEach((user, index) => {
//         html += `            
//         <tr>
//                 <td>${user.name}</td>
//                  <td>${user.age}</td>
//                 <td><button class ="deleteByID" data-index="${index}" >Xóa</button></td>
//                   <td><button class ="editByID" data-index="${index}" >edit</button></td>
//         </tr>
//             `;
//     });
//     list_table.innerHTML = html;

// }

// function render_textboxEdit(user) {
//     const update_textbox = document.getElementById("update_textbox");

//     update_textbox.innerHTML = `
//         <input id="update_name" value="${user.name}" />
//         <input id="update_age" value="${user.age}" />
//     `;

// }


// function addUser() {
//     const newUser = {
//         name: inputname.value,
//         age: inputage.value
//     };
//     users.push(newUser);
//     saveUser();
//     render();
//     inputname.value = "";
//     inputage.value = "";
// }


// render();

// add.addEventListener("click", () => {
//     addUser();
// })

// list_table.addEventListener("click", (event) => {
//     const index = event.target.dataset.index;
//     if (event.target.classList.contains("deleteByID")) {
//         users.splice(index, 1);
//         saveUser();
//         render();
//     }
//     if (event.target.classList.contains("editByID")) {
//         editIndex = index;
//         render_textboxEdit(users[index]);
//     }

// })


// update.addEventListener("click", () => {
//     if (editIndex === -1) return;
//     const inputname = document.getElementById("update_name");
//     const inputage = document.getElementById("update_age");
//     users[editIndex] = {
//         name: inputname.value,
//         age: inputage.value
//     };
//     saveUser();
//     render();
//     document.getElementById("update_textbox").innerHTML = "";
//     // document.getElementById("update_textbox").textContent = "";
//     editIndex = -1;
// });




// 1. DATA
let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = -1;

// 2. DOM
const nameUserTb = document.querySelector("#nameUser");
const passwordTb = document.querySelector("#pass");
const registerBtn = document.querySelector("#register");
const listTable = document.querySelector("#list_table");
const tableUser = document.querySelector("#table_user");

const emailError = document.querySelector("#emailError");
const passError = document.querySelector("#passError");


// 3. SAVE
function save() {
    localStorage.setItem("users", JSON.stringify(users));
};

// 4. RENDER
function render() {
    let html = "";

    users.forEach((user, index) => {
        html += `
            <tr>
                    <td>${user.userName}</td>
                    <td>${user.pass}</td>
                    <td><button class="deleteByID" data-index="${index}">Xóa</button></td>
                    <td><button class="editByID" data-index="${index}">edit</button></td>
                </tr>
    `;
    });

    listTable.innerHTML = html;
};

function validateForm(Uservalue, Passvalue) {

    if (!Uservalue || !Passvalue) {
        emailError.textContent = "⚠ Email không được để trống";
        passError.textContent = "⚠ Password không được để trống";
        return;
    }

    if (Uservalue.length < 6) {
        emailError.textContent = "⚠ email chưa đủ độ dài";
        return;
    }


}

// 5. LOGIC
function addUser() {
    const Uservalue = nameUserTb.value;
    const Passvalue = passwordTb.value;

    // let isValid = true;
    validateForm(Uservalue, Passvalue);
    // reset error
    emailError.textContent = "";
    passError.textContent = "";

    const user = {
        userName: Uservalue,
        pass: Passvalue
    };

    users.push(user);
    save();
    render();
    nameUserTb.value = "";
    passwordTb.value = "";
};


// 6. EVENT
render();
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addUser();

});


listTable.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("deleteByID")) {
        users.splice(index, 1);
        save();
        render();
    }
});


// users = [];