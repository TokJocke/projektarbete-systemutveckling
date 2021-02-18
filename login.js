
let body = document.getElementById("indexBody")
const login = document.getElementById("login")
const cancel = document.getElementById("cancel")
const userLogin = document.getElementById("userLogin")
const loginForm = document.getElementById("logInForm")
const background = document.getElementById("testBackground")



window.onclick = function(event) {
    if (event.target == background) {
      background.style.display = "none";
      logInForm.style.display = "none"
    }
  }

userLogin.addEventListener("click", () =>{
    loginForm.style.display = "flex"
    background.style.display = "flex"
  })


cancel.addEventListener("click", () => {
    logInForm.style.display = "none"
    background.style.display = "none"
} )


login.addEventListener("click", () => {
    window.location.href = "/myPage.html";
} )
