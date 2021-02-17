import {makeReq} from "./main.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        regButton()
        loginBtn()
        
        /* getuserDetails() */
 	}
}
//Log in inputs
let signinUsername = document.getElementById("signinUsername").value
let signinPassword = document.getElementById("signinPassword").value
let signinBtn = document.getElementById("loginButton")


let registerBtn = document.getElementById("registerButton")


async function regUser() {
    let newUser =  {
        Email: document.getElementById("registerEmail").value,
        regName: document.getElementById("registerName").value,
        regUsername: document.getElementById("registerUsername").value,
        registerPassword: document.getElementById("registerPassword").value,
        regZip: document.getElementById("registerZip").value,
        regAddress: document.getElementById("registerAddress").value,
        regPhone: document.getElementById("registerPhone").value
    }
    

    let body = new FormData()
    body.set("newUser", JSON.stringify(newUser))
    body.set("action", "register")
 
    const response = await makeReq("./api/recievers/userReciever.php", "POST", body)
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

       /* getuserDetails(email, username) */
      

        // Kollar om inputfält är null eller tomma. 
       if (email == null || email == "" || name == null || name == "" || username == null || username == "" 
       || password == null || password == "" || zipcode == null || zipcode == "" || address == null 
       || address == "" || phoneNr == null || phoneNr == "") {
        
        alert("Please Fill All Required Fields");
        return false;
        }  
    
        
        else {

           regUser()
           alert("You successfully created an account" +  username)
           return
        } 
}
 
/* async function getuserDetails(EmailToCheck, NameToCheck) {  
    const response = await makeReq("./api/recievers/userReciever.php", "GET")
    for (let i = 0; i < response.length; i++) {
        const myArray = response[i];
        console.log(myArray)
        if(myArray.email === EmailToCheck || myArray.userName === NameToCheck) {
            console.log("username or email already taken")
        }  
        
    }
    
} */
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
    console.log(response)
}


