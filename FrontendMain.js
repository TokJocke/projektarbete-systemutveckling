import {login, checkInputs} from "./user.js"
import { getAllProducts, renderProducts, getAllProdsInCategory, amountInCart } from "./products.js"
import {makeReq, getAllCategorys, filterProducts } from "./main.js"
import {currentUser} from "./myPage.js"


window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")
const formUser = document.getElementById("formUser")

function initSite() {
  if (body){

    filterProducts()
    loginPopUp()
    clickOutSideToClose()
    closePopUp()
    amountInCart()
    currentUser()
    cartButton() //Kan ej gå in i cart utan inlogg.
    
 	}
}

async function cartButton() {
  let x = document.getElementById("cartRedirection")
  x.addEventListener("click", cartRedirection)
}

async function cartRedirection() {
  const userCheck = await makeReq("./api/recievers/userReciever.php?checkUser", "GET")
  
  if(userCheck === "NotLogged") {
    alert("Du måste logga in eller skapa konto först.")
  }
  
  else {
    window.location = "cartPage.html"
  }
   
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
  password.type = "password"
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

function clickOutSideToClose() {
  
  const background = document.getElementById("popupBackground")
  window.onclick = function(event) {
     if (event.target == background) {
       background.style.display = "none";
       logInForm.style.display = "none";
       formUser.innerHTML = ""
     }  
 }

}



async function loginPopUp() {
  const userLogin = document.getElementsByClassName("myPageBtn")[0]
  const background = document.getElementById("popupBackground")

  const response = await makeReq("./api/recievers/userReciever.php?checkUser", "GET") 

  userLogin.addEventListener("click", () =>{
    if(response === "Logged") {
      window.location = "myPage.html"
     
    }

    else {
      logInForm.style.display = "flex"
      background.style.display = "flex"
      loadSignIn()
    }
    
  })
 
}

function closePopUp() {
  const cancel = document.getElementById("cancel")
  const background = document.getElementById("popupBackground")

  cancel.addEventListener("click", () => {
      logInForm.style.display = "none"
      background.style.display = "none"
      formUser.innerHTML = ""
  } )
}








 
