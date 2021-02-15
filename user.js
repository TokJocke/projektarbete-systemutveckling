import {makeReq} from "./main.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        regButton()
 	}
}
//Log in inputs
let signinUsername = document.getElementById("signinUsername")
let signinPassword = document.getElementById("signinPassword")
let signinBtn = document.getElementById("signinBtn")
//Reg inputs, isAdmin skall alltid vara 0 vid regg. 
let registerEmail = document.getElementById("registerEmail").value
let registerName = document.getElementById("registerName").value
let registerUsername = document.getElementById("registerUsername").value
let registerPassword = document.getElementById("registerPassword").value
let registerZip = document.getElementById("registerZip").value
let registerAddress = document.getElementById("registerAddress").value
let registerPhone = document.getElementById("registerPhone").value
let registerBtn = document.getElementById("registerButton")


async function regUser() {
    const newUser =  {
        Email: document.getElementById("registerEmail").value,
        regName: document.getElementById("registerName").value,
        regUsername: document.getElementById("registerUsername").value,
        registerPassword:  document.getElementById("registerPassword").value,
        regZip: document.getElementById("registerZip").value,
        regAddress: document.getElementById("registerAddress").value,
        regPhone: document.getElementById("registerPhone").value
    }
  
    let body = new FormData()
    body.set("newUser", JSON.stringify(newUser))




   /*  body.set("email", registerEmail)
    body.set("name", registerName)
    body.set("registerUsername", registerUsername)
    body.set("registerPassword", registerPassword)
    body.set("registerZip", registerZip)
    body.set("registerPhone", registerPhone)
    body.set("regAddress", registerAddress) */
    
    const response = await makeReq("./api/recievers/userReciever.php", "POST", body)
    console.log(response)
}

async function regButton() {
    registerBtn.addEventListener("click", regUser)
}