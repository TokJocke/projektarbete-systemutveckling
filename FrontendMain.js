

let body = document.getElementById("indexBody")
const formUser = document.getElementById("formUser")
const login = document.getElementById("login")
const cancel = document.getElementById("cancel")
const userLogin = document.getElementById("userLogin")
const loginForm = document.getElementById("logInForm")
const background = document.getElementById("popupBackground")
const registerBtn = document.getElementById("registerBtn")
document.getElementById("menuBtn").onclick = function() {menuToggle(this)};
const cartBtn = document.getElementById("cartBtn")

/* registerBtn.addEventListener("click", () => {
  loginForm.innerHTML =
  loadRegForm()
}) */

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

  inputMail.id = "registerEmail"
  inputUsername.id = "registerUsername"
  inputPassword.id = "registerPassword"
  inputName.id = "registerName"
  inputAdress.id = "registerAdress" 
  inputZip.id = "registerZim" 
  inputPhone.id = "registerPhone" 
  newsletter.id = "cb"

  newsletter.type = "checkbox"
  
  checkboxDiv.style.display = "flex"
  checkboxDiv.style.alignItems = "center"

  btn.innerText = "Registrera"
  btn.className = "defaultBtn"
  text.innerText = "Nyhetsbrev"

  btn.addEventListener("click", ()=> { //Registreringsknapp eventlistener
    formUser.innerHTML = ""
    text.innerText = "Tack för din registrering"
    formUser.append(text)
  })
  
  checkboxDiv.append(text,newsletter)
  
  formUser.append(head,
    inputMail,
    inputUsername,
    inputPassword,
    inputName,
    inputAdress,
    inputZip,
    inputPhone,checkboxDiv,
    btn)

  }


function loadSignIn(){
  const username = document.createElement("input")
  const password = document.createElement("input")
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

  loginBtn.className = "defaultBtn"
  loginBtn.type = "submit"
  loginBtn.innerText = "Logga in"

  formUser.append(username,password,loginBtn, RegText)

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


login.addEventListener("click", () => {
    window.location.href = "/myPage.html";
} )


/* <!-- Jocke & sebbes divar. Ska flyttas till Robins layout

<div>
    <div class="log-menu">
        <h1 class="menu-header">LOG-IN</h1>
        <input id="signinUsername" placeholder="username"> 
        <input id="signinPassword" type="password" placeholder="password">
        <div id="error-div"></div> 
        <button id="loginButton" type="submit">Sign in</button>
    </div>



<div id="testDiv"></div>

    
    <div class="reg-menu">
        <h1 class="menu-header">CREATE ACCOUNT</h1>
        <input id="registerEmail" placeholder="Enter your email">
        <input id="registerName" placeholder="Whats your name?"> 
        <input id="registerUsername" placeholder="Choose a username">
        <input id="registerPassword" type="password" placeholder="Choose your password">
        <input id="registerZip" placeholder="Enter your zip code">
        <input id="registerAddress" placeholder="Enter your address">
        <input id="registerPhone" placeholder="Enter your phone number">
        <div id="newsletter"><h4>Newsletter</h4><input id="cb" type="checkbox"></div>
        <div id="errorDiv"></div>  
        <button id="registerButton" type="submit">Register</button>  
    </div>
</div>

 --></input> */