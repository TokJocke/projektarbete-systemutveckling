import {login, checkInputs} from "./user.js"

window.addEventListener("load", initSite)

function initSite() {
	if (body){
       
 	}
}

let body = document.getElementById("indexBody")
const formUser = document.getElementById("formUser")
const cancel = document.getElementById("cancel")
const userLogin = document.getElementById("userLogin")
const background = document.getElementById("popupBackground")
document.getElementById("menuBtn").onclick = function() {menuToggle(this)};
const cartBtn = document.getElementById("cartBtn")

/** menyknapp toggle */
function menuToggle(x) {
  x.classList.toggle("change");
} 
 
function loadRegForm(){
  const checkboxDiv = document.createElement("div")
  const inputMail = document.createElement("input")
  const inputUsername = document.createElement("input")
  const inputPassword = document.createElement("input")
  const inputName = document.createElement("input")
  const inputAdress = document.createElement("input")
  const inputZip = document.createElement("input")
  const inputPhone = document.createElement("input")
  const newsletter = document.createElement("input")
  const errorlog = document.createElement("div")
  const head = document.createElement("h1")
  const text = document.createElement("p")
  const btn = document.createElement("div")
  head.innerText = "Registrera ny kund"
  inputMail.placeholder = "Mail"
  inputUsername.placeholder = "Användarnamn"
  inputPassword.placeholder = "Lösenord"
  inputName.placeholder = "Namn"
  inputAdress.placeholder = "Adress" 
  inputZip.placeholder = "Postnummer" 
  inputPhone.placeholder = "Telefon" 
  newsletter.placeholder = "Nyhetsbrev"

  inputZip.type = "number"
  inputPhone.type = "number"

  inputMail.id = "registerEmail"
  inputUsername.id = "registerUsername"
  inputPassword.id = "registerPassword"
  inputName.id = "registerName"
  inputAdress.id = "registerAddress" 
  inputZip.id = "registerZip" 
  inputPhone.id = "registerPhone" 
  newsletter.id = "cb"
  errorlog.id = "errorDiv"

  newsletter.type = "checkbox"
  
  checkboxDiv.style.display = "flex"
  checkboxDiv.style.alignItems = "center"

  btn.innerText = "Registrera"
  btn.className = "defaultBtn"
  text.innerText = "Nyhetsbrev"

  btn.addEventListener("click", ()=> { //Registreringsknapp eventlistener
    checkInputs()
  })
  
  checkboxDiv.append(text,newsletter)
  
  formUser.append(head,
    inputMail,
    inputUsername,
    inputPassword,
    inputName,
    inputAdress,
    inputZip,
    inputPhone,
    errorlog,
    checkboxDiv,
    btn)

  }


function loadSignIn(){
  const username = document.createElement("input")
  const password = document.createElement("input")
  const errorlog = document.createElement("div")
  const loginBtn = document.createElement("div")
  const RegText = document.createElement("p")
  RegText.innerHTML = "Ej medlem? Registrera dig <b>här</b>"
  RegText.addEventListener("click", () => {
    formUser.innerHTML = ""
    loadRegForm()
  })
  
  username.placeholder = "Användarnamn"
  password.placeholder = "Lösenord"

  username.id = "signinUsername"
  password.id = "signinPassword"
  errorlog.id = "error-div"

  loginBtn.className = "defaultBtn"
  loginBtn.type = "submit"
  loginBtn.innerText = "Logga in"

  loginBtn.addEventListener("click", () => {
    login()
} )

  formUser.append(username,password, errorlog, loginBtn, RegText)

}

window.onclick = function(event) {
    if (event.target == background) {
      background.style.display = "none";
      logInForm.style.display = "none";
      formUser.innerHTML = ""
    }
  }

userLogin.addEventListener("click", () =>{
    logInForm.style.display = "flex"
    background.style.display = "flex"
    loadSignIn()
  })


cancel.addEventListener("click", () => {
    logInForm.style.display = "none"
    background.style.display = "none"
    formUser.innerHTML = ""
} )


/* <!-- Jocke & sebbes divar. Ska flyttas till Robins layout


<div id="testDiv"></div>

  
 --> */