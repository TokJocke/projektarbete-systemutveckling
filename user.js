import {makeReq} from "./main.js"


window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
       signNews()
 	}
}

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
    
    if(response === "Successfully signed up") {
        formUser.innerHTML = ""
        const text = document.createElement("p")
        text.innerText = "Tack för din registrering"
        formUser.append(text) 
    }
    console.log(response)
}

export async function checkInputs() {
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

        let div = document.getElementById("errorDiv")
        div.innerText = "Please Fill All Required Fields*"
        div.style.color = "red"
        
    
        return false;
        }    
        else {
           regUser()
           return
        } 
}
 
export async function login() {
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
        window.location.href = "/myPage.html"; 
    }
    
    console.log(response)
}
let newsBtn = document.getElementById("newsBtn")

async function Newsletter() { //Signa newsletter ej inloggad.
    let newsL = {
        name: document.getElementById("newsName").value,
        email: document.getElementById("newsEmail").value
    }

    let body = new FormData()
    body.set("newsL", JSON.stringify(newsL))
    body.set("action", "newsletter")
    const response = await makeReq("./api/recievers/userReciever.php", "POST", body)
    if(response === "Email taken") {
        let x = document.getElementById("responsePhp")
        x.innerText = "Email finns redan, testa en annan"
    }
    console.log(response)
    
}
async function signNews() {
    newsBtn.addEventListener("click", Newsletter)
}

