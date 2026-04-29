// 1. DOM ELEMENTS
const emailInput = document.querySelector("#email");
const passInput = document.querySelector("#password");
const errorEmail = document.querySelector("#error-email");
const errorPass = document.querySelector("#error-pass");

const forgotPasswordLink = document.querySelector("#forgot_password");
const loginBtn = document.querySelector("#loginBtn");
const loginSsoBtn = document.querySelector("#loginSsoBtn");

// 2. VALIDATION HELPERS
// ======================
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isEmpty(value) {
    return value.trim() === "";
}


// function setLoading(isLoading) {
//     loginBtn.disabled = isLoading;
//     loginBtn.innerText = isLoading ? "Loading..." : "Login";
// }

function clearErrors() {
    errorEmail.innerText = "";
    errorPass.innerText = "";
}

// 4. MAIN LOGIN HANDLER
// ======================
loginBtn.addEventListener("click", async function () {

    const email = emailInput.value;
    const password = passInput.value;

    clearErrors();

    let hasError = false;

    // ----------------------
    // VALIDATE EMAIL
    // ----------------------
    if (isEmpty(email)) {
        errorEmail.innerText = "Vui lòng nhập email";
        hasError = true;
    } else if (!isValidEmail(email)) {
        errorEmail.innerText = "Email không đúng định dạng";
        hasError = true;
    }

    // ----------------------
    // VALIDATE PASSWORD
    // ----------------------
    if (isEmpty(password)) {
        errorPass.innerText = "Vui lòng nhập password";
        hasError = true;
    }

    if (hasError) return;

    // ----------------------
    // CALL API
    // ----------------------
    try {
        // setLoading(true);

        const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // success
            localStorage.setItem("token", data.access_token);
            window.location.href = "home.html";
        } else {
            // backend error
            emailError.innerText = data.detail || "Login thất bại!";
        }

    } catch (err) {
        emailError.innerText = "Không kết nối được server!";
    } finally {
        setLoading(false);
    }
});