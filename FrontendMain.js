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


const cartBtn = document.getElementById("cartBtn")


 

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












  function headerLinks() {
    let headerLink = document.querySelectorAll("#headerTop a")
    let header = document.getElementsByTagName("header")[0]
    let headerTop = document.getElementById("headerTop")
    let headerBox = document.getElementsByClassName("headerBox")
    let menuBtn = document.getElementById("menuBtn")



    for(let i = 0; i < headerLink.length; i++) {
      console.log(headerLink[i])
      
      headerLink[i].addEventListener("click", () => {
        menuBtn.classList.toggle("change");
        console.log("clicked", headerLink[i])
        header.style.height = "8vh"
        headerTop.style.height = "0vh"
        window.setTimeout(() => {
          headerTop.style.display = "none"
          for(let i = 0; i < headerBox.length; i++) {
            headerBox[i].style.display = "none"
          }
        }, 500);
      }) 
    }
  }    
  
    


  
  

headerLinks()



 function growHeader() {
    let header = document.getElementsByTagName("header")[0]
    let headerTop = document.getElementById("headerTop")
    let menuBtn = document.getElementById("menuBtn")
    let headerBox = document.getElementsByClassName("headerBox")
    header.style.height = "8vh"
    headerTop.style.height = "0vh"

    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("change");
      if(header.style.height == "8vh") {
        header.style.height = "24vh"
        headerTop.style.height = "16vh"
        headerTop.style.display = "flex"
        window.setTimeout(() => {
          for(let i = 0; i < headerBox.length; i++) {
            headerBox[i].style.display = "flex"
            headerBox[i].classList="headerBox slideRight"
          }
        }, 500);
      }
      else {   
        header.style.height = "8vh"
        headerTop.style.height = "0vh"
        window.setTimeout(() => {
          headerTop.style.display = "none"
          for(let i = 0; i < headerBox.length; i++) {
            headerBox[i].style.display = "none"
          }
        }, 500);
        } 
    })
  } 



  growHeader()

