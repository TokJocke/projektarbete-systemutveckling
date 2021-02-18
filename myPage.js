import {makeReq} from "./main.js"
window.addEventListener("load", initSite)
let body = document.getElementById("myPageBody")
const myPageDiv = document.getElementById("myPageContent")
const userBtn = document.getElementById("userBtn")
const ordersBtn = document.getElementById("ordersBtn")
const letterBtn = document.getElementById("letterBtn")

function initSite() {
	if (body){
		userInfo()
    
 	}
}

function userInfo(){
	letterBtn.style.borderLeft = "10px solid transparent"
	ordersBtn.style.borderLeft = "10px solid transparent"
	userBtn.style.borderLeft = "10px solid #B4CDCC"
	//rendera ut användarens uppgifter från databasen
	const header = document.createElement("h1")
	header.innerText = "Kunduppgifter"
	myPageDiv.appendChild(header)

}

function getOrderHistory(){
	userBtn.style.borderLeft = "10px solid transparent"
	letterBtn.style.borderLeft = "10px solid transparent"
	ordersBtn.style.borderLeft = "10px solid #B4CDCC"
	
	// rendera ut gamla ordrar
	const header = document.createElement("h1")
	header.innerText = "Orderhistorik"

	myPageDiv.appendChild(header)
}

function newsLetter(){
	userBtn.style.borderLeft = "10px solid transparent"
	ordersBtn.style.borderLeft = "10px solid transparent"
	letterBtn.style.borderLeft = "10px solid #B4CDCC"
	// rendera ut newsletter alternativ
	const header = document.createElement("h1")
	header.innerText = "Nyhetsbrev"

	myPageDiv.appendChild(header)
}


userBtn.addEventListener("click", () => {
	myPageDiv.innerHTML = ""
	userInfo()

})

ordersBtn.addEventListener("click", () => {
	myPageDiv.innerHTML = ""
	getOrderHistory()

})

letterBtn.addEventListener("click", () => {
	myPageDiv.innerHTML = ""
	newsLetter()
})



