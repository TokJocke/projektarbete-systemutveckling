import {login, checkInputs} from "./user.js"
import { getAllProducts, renderProducts, getAllProdsInCategory, amountInCart } from "./products.js"
import {makeReq, getAllCategorys } from "./main.js"
import {currentUser} from "./myPage.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")
const formUser = document.getElementById("formUser")

function initSite() {
  if (body){

    renderProducts(getAllProducts())
    growHeader()
    headerNavBtn("#anchorProduct") 
    loginPopUp()
    clickOutSideToClose()
    closePopUp()
    amountInCart()
    currentUser()
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

function loginPopUp() {
  const userLogin = document.getElementById("userLogin")
  const background = document.getElementById("popupBackground")

  userLogin.addEventListener("click", () =>{

    logInForm.style.display = "flex"
    background.style.display = "flex"
    loadSignIn()
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





 
export async function headerNavBtn(link) {
  //Get alla elements needed
  let allCategorys = await getAllCategorys()
  let headerTop = document.getElementById("headerTop")
  //Create a button for all categorys
  let a = document.createElement("a")
  let div = document.createElement("div") 
  let h2 = document.createElement("h2")
  a.href = link
  a.id = "showAllProducts"
  div.className = "headerBox"
  h2.innerText = "Alla produkter"
  a.addEventListener("click", showAllProducts)
  div.append(h2)
  a.append(div)
  headerTop.append(a)
  //Create a button for each category
  allCategorys.forEach(category => {
    //create elements
    let a = document.createElement("a")
    let div = document.createElement("div") 
    let h2 = document.createElement("h2")
    //properties
    a.href = link
    div.className = "headerBox"
    h2.innerText = category.name
    //Appends
    div.append(h2)
    a.append(div)
    headerTop.append(a)
    
     a.addEventListener("click", filterProducts.bind(category)) 

  });
} 

 export function filterProducts() {
  let productContainer = document.getElementById("allProductBox")
  let headline = document.getElementById("anchorProduct")
  
  headline.innerText= "Produkter > " + this.name
  productContainer.innerHTML  = ""
  renderProducts(getAllProdsInCategory(this.categoryId)) 
  headerLinks()
}
 
function showAllProducts() {
  let productContainer = document.getElementById("allProductBox")
  let headline = document.getElementById("anchorProduct")

  headline.innerText="Produkter"
  productContainer.innerHTML  = ""
  renderProducts(getAllProducts())
  headerLinks()
}



  

export function headerLinks() {
  let menuBtn = document.getElementById("menuBtn")
  let header = document.getElementsByTagName("header")[0]
  let headerBox = document.getElementsByClassName("headerBox")

  menuBtn.classList.toggle("change");
  header.className = ""
  window.setTimeout(() => {
    for(let i = 0; i < headerBox.length; i++) {      
      headerBox[i].className = "headerBox"
    }
  }, 500);
  }      
  

export function growHeader() {
  
  let header = document.getElementsByTagName("header")[0] 
  let headerTop = document.getElementById("headerTop")
  let menuBtn = document.getElementById("menuBtn")
  let menu = document.getElementsByClassName("menu")[0]//Change name this and the button above
  let headerBox = document.getElementsByClassName("headerBox")

  console.log(headerTop)
  
  menu.addEventListener("click", () => {
    header.classList.toggle("growHeader")
    menuBtn.classList.toggle("change");
    headerTop.className = "showHeaderContent"
    if(header.classList == "growHeader") { 
      for(let i = 0; i < headerBox.length; i++) {
        
          headerBox[i].className = "showHeaderContent headerBox slideRight"
          console.log("if")
        }

      }
      else {
        console.log("else")

          window.setTimeout(() => {

            for(let i = 0; i < headerBox.length; i++) {
        
              headerBox[i].className = "headerBox"
            }
          }, 500);
      }
  }) 
}

