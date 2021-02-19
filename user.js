import {makeReq} from "./main.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        regButton()
        loginBtn()
 	}
}

let signinBtn = document.getElementById("loginButton")
let registerBtn = document.getElementById("registerButton")

async function regUser() {
    let checkbox = document.getElementById("cb")
    if(checkbox.checked) { //Kollar om checkbox för newsletter är 
        checkbox = "Yes"   //checkad och skickar upp Yes/No.
        console.log("Yes")
    }
    else {
        checkbox = "No"
        console.log("No")
    }

    let newUser =  {
        Email: document.getElementById("registerEmail").value,
        regName: document.getElementById("registerName").value,
        regUsername: document.getElementById("registerUsername").value,
        registerPassword: document.getElementById("registerPassword").value,
        regZip: document.getElementById("registerZip").value,
        regAddress: document.getElementById("registerAddress").value,
        regPhone: document.getElementById("registerPhone").value,
        newsletter: checkbox,
    }
    
    let body = new FormData()
    body.set("newUser", JSON.stringify(newUser))
    body.set("action", "register")

    const response = await makeReq("./api/recievers/userReciever.php", "POST", body)
    let div = document.getElementById("errorDiv")
    div.innerText = response
    console.log(response)
}

async function regButton() { 
    registerBtn.addEventListener("click", checkInputs)    
}

async function checkInputs() {
       let email =  document.getElementById("registerEmail").value
       let name = document.getElementById("registerName").value
       let username = document.getElementById("registerUsername").value
       let password = document.getElementById("registerPassword").value
       let zipcode = document.getElementById("registerZip").value
       let address = document.getElementById("registerAddress").value
       let phoneNr = document.getElementById("registerPhone").value

        // Kollar om inputfält är null eller tomma. 
       if (email == null || email == "" || name == null || name == "" || username == null || username == "" 
       || password == null || password == "" || zipcode == null || zipcode == "" || address == null 
       || address == "" || phoneNr == null || phoneNr == "") {
        
        alert("Please Fill All Required Fields");
        return false;
        }    
        else {
           regUser()
           return
        } 
}
 
async function loginBtn() {
    signinBtn.addEventListener("click", login)
}

async function login() {
    let logDetails = {
        username: document.getElementById("signinUsername").value,
        pw: document.getElementById("signinPassword").value
    }
    let body = new FormData()
    body.set("logdetails", JSON.stringify(logDetails))
    body.set("action", "login")
    
    const response = await makeReq("./api/recievers/userReciever.php", "POST", body)
    let div = document.getElementById("error-div")
    
    if(response === "Login failed") {
        div.innerText = response
        div.style.color = "red"
    }

    if(response === "Login success") {
        div.innerText = response
        div.style.color = "green"
    }
    
    console.log(response)
}


