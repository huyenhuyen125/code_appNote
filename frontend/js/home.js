const STORAGE_KEY = "debts";

// lấy data
function getDebts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// render list + tổng
function renderScreen1() {
  const debts = getDebts();

  const list = document.getElementById("debt-list");
  const totalDebtEl = document.getElementById("total-debt");
  const totalLoanEl = document.getElementById("total-loan");

  list.innerHTML = "";

  let totalDebt = 0; // tôi nợ
  let totalLoan = 0; // cho vay

  debts.forEach(d => {
    const amount = Number(d.amount);

    // tính tổng
    if (amount < 0) {
      totalDebt += amount;
    } else {
      totalLoan += amount;
    }

    // tạo UI
    const div = document.createElement("div");
    div.className = "card";

    const isDebt = amount < 0;

    div.innerHTML = `
      <img src="../image/images.jpg">
      <div class="info">
        <div class="name">${d.user}</div>
        <div class="desc">${d.reason || ""}</div>
      </div>
      <div class="money ${isDebt ? "red" : "green"}">
        ${amount > 0 ? "+" : ""}${amount}
      </div>
    `;

    list.appendChild(div);
  });

  // update tổng
  totalDebtEl.innerText = `[TỔNG TÔI NỢ: ${Math.abs(totalDebt)}đ]`;
  totalLoanEl.innerText = `[TỔNG CHO VAY: ${totalLoan}đ]`;
}


// NAV
document.querySelectorAll(".nav-item")[0].onclick = () => {
  window.location.href = "register.html";
};

document.querySelectorAll(".nav-item")[1].onclick = () => {
  window.location.href = "home.html";
};

// button tạo người mới
document.querySelector(".add-btn").onclick = () => {
  window.location.href = "register.html";
};

// load
renderScreen1();