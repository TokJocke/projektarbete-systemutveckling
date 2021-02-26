import {makeReq} from "./main.js"
import {amountInCart} from "./products.js"
import { growHeader, filterProducts, headerNavBtn } from "./FrontendMain.js"

window.addEventListener("load", initSite)
let body = document.getElementById("myPageBody")
const myPageDiv = document.getElementById("myPageContent")
const userBtn = document.getElementById("userBtn")
const ordersBtn = document.getElementById("ordersBtn")
const letterBtn = document.getElementById("letterBtn")

function initSite() {
	if (body){
	/* 	userBtnClick()
		ordersBtnClick()
		letterBtnClick()
		renderUserInfo() */
		amountInCart()
	//	currentUser()
	//	userInfo()
		growHeader()
		headerNavBtn("./index.html#anchorProduct")
 	}
}

async function getUserInfo() {

    const response = await makeReq("./api/recievers/userReciever.php", "GET")
    return response
}
//prints out current users info
async function userBtnClick(){

	userBtn.addEventListener("click", () => {
		myPageDiv.innerHTML = ""

		letterBtn.style.borderLeft = "10px solid transparent"
		ordersBtn.style.borderLeft = "10px solid transparent"
		userBtn.style.borderLeft = "10px solid #B4CDCC"

		renderUserInfo()
	})
}
//prints out old olders
async function ordersBtnClick(){

	const header = document.createElement("h1")
	header.innerText = "Orderhistorik"
	myPageDiv.appendChild(header)

	ordersBtn.addEventListener("click", () => {
		myPageDiv.innerHTML = ""

		letterBtn.style.borderLeft = "10px solid transparent"
		ordersBtn.style.borderLeft = "10px solid transparent"
		userBtn.style.borderLeft = "10px solid #B4CDCC"

	})
}
//print out newsletter
async function letterBtnClick(){

	const header = document.createElement("h1")
	header.innerText = "Nyhetsbrev"
	myPageDiv.appendChild(header)

	ordersBtn.addEventListener("click", () => {
		myPageDiv.innerHTML = ""

		letterBtn.style.borderLeft = "10px solid transparent"
		ordersBtn.style.borderLeft = "10px solid transparent"
		userBtn.style.borderLeft = "10px solid #B4CDCC"

	})
}



// skriv ut kunduppgifter
async function renderUserInfo (){
	let info = await getUserInfo()
    /* let allProducts = cart.productList */
    let wrapper = document.getElementById("myPageContent")
	const header = document.createElement("h1")
	header.innerText = "Kunduppgifter"
	
    wrapper.innerHTML = ""
	checkIfAdmin()
	
	//create all divs
	let container = document.createElement("div")
	let infoName = document.createElement("p")
	let infoUserId = document.createElement("p")
	let infoAddress = document.createElement("p")
	let infoZip = document.createElement("p")
	let infoEmail = document.createElement("p")
	let infoPhoneNr = document.createElement("p")
	let infoIsAdmin = document.createElement("p") 
	infoIsAdmin.id = "infoIsAdmin" 
	container.className = "userInfoContainer"
	
	//context
	infoName.innerHTML = "Namn:"+ " "+ info[0].name
	infoUserId.innerHTML = "UserId:"+ " "+ info[0].userId
	infoAddress.innerHTML = "Adress:"+ " "+ info[0].address
	infoZip.innerHTML = "Postkod:"+ " "+ info[0].zipCode
	infoEmail.innerHTML = "Email:"+ " "+ info[0].email
	infoPhoneNr.innerHTML = "Telefon:"+ " "+ info[0].phoneNr
	
	//append everything
	container.append(infoName,infoUserId,infoAddress,infoZip,infoEmail,infoPhoneNr, infoIsAdmin)
	wrapper.append(header, container)
    console.log("response" , info)
    
	
}

export async function currentUser () {
	let result = await makeReq("./api/recievers/userReciever.php?user", "GET")
	console.log(result[0].name)
	let nameContainer = document.getElementById("currentUser")
	nameContainer.innerText = result[0].name
}
async function checkIfAdmin (){
	let check = await makeReq("./api/recievers/userReciever.php?check", "GET")
	let result = check
	console.log(result)
	let infoIsAdmin = document.getElementById("infoIsAdmin")
	infoIsAdmin.innerHTML = "Admin:" + " " + result
	
}

