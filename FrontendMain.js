
let body = document.getElementById("indexBody")
const login = document.getElementById("login")
const cancel = document.getElementById("cancel")
const userLogin = document.getElementById("userLogin")
const loginForm = document.getElementById("logInForm")
const background = document.getElementById("popupBackground")
const registerBtn = document.getElementById("registerBtn")

registerBtn.addEventListener("click", () => {
  loginForm.innerHTML = ""
  loadRegForm()
})


function loadRegForm(){
  const inputOne = document.createElement("input")
  const inputtwo = document.createElement("input")
  const inputthree = document.createElement("input")
  const inputfour = document.createElement("input")
  const head = document.createElement("h1")
  head.innerText = "Registrera ny kund"
  inputOne.placeholder = "Namn"
  inputtwo.placeholder = "Mail"
  inputthree.placeholder = "Adress"
  inputfour.placeholder = "zip" 

  loginForm.append(head, inputOne,inputtwo,inputthree,inputfour)
}

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
