
let body = document.getElementById("indexBody")
const login = document.getElementById("login")
const cancel = document.getElementById("cancel")
const userLogin = document.getElementById("userLogin")
const loginForm = document.getElementById("logInForm")
const background = document.getElementById("popupBackground")
const registerBtn = document.getElementById("registerBtn")
const cartBtn = document.getElementById("cartBtn")

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