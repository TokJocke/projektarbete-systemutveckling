import {makeReq} from "./main.js"
import {amountInCart} from "./products.js"
//import { growHeader, filterProducts, headerNavBtn } from "./FrontendMain.js"

window.addEventListener("load", initSite)
let body = document.getElementById("myPageBody")
const myPageDiv = document.getElementById("myPageContent")
const userBtn = document.getElementById("userBtn")
const ordersBtn = document.getElementById("ordersBtn")
const letterBtn = document.getElementById("letterBtn")

function initSite() {
	if (body){
		userBtnClick()
		ordersBtnClick()
		/* letterBtnClick() */
		renderUserInfo()
		amountInCart()
		currentUser()
	
		getUserInfo()
		/* getCurrentUserOrder() */

 	}
}

async function getUserInfo() {

    const response = await makeReq("./api/recievers/userReciever.php?user", "GET")
	console.log(response)
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

	

	ordersBtn.addEventListener("click", () => {
		myPageDiv.innerHTML = " "

		letterBtn.style.borderLeft = "10px solid transparent"
		ordersBtn.style.borderLeft = "10px solid transparent"
		userBtn.style.borderLeft = "10px solid #B4CDCC"
		loadOldOrders()
		

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
	/* console.log(result[0].name) */
	let nameContainer = document.getElementById("currentUser")
	if (result[0].name == null) {
        nameContainer.innerHTML = ""
    }
    else {
        nameContainer.innerHTML = result[0].name
    }
	
}
// check if user is admin
async function checkIfAdmin (){
	let check = await makeReq("./api/recievers/userReciever.php?check", "GET")
	let result = check
	console.log(result)
	let infoIsAdmin = document.getElementById("infoIsAdmin")
	infoIsAdmin.innerHTML = "Admin:" + " " + result
	
}
// gets the current logged in users order history
async function getCurrentUserOrder() {
    const response = await makeReq("./api/recievers/orderReciever.php?user", "GET")
    console.log(response)
	
    return response
}
async function loadOldOrders() {
    let content = document.getElementById("myPageContent")
    content.innerHTML = ""
    let header = document.createElement("h2")

	let headerOrder = document.createElement("h1")
	headerOrder.innerText = "Orderhistorik"

    header.align = "center"
    header.innerText = "Mark orders as recieved"
    content.append(headerOrder, header)
  
    //hämtar ordrar
    let getAllOrders = await getCurrentUserOrder() 
	if(getAllOrders.length == 0){
		content.innerHTML = " "
		return
	}
	console.log(getAllOrders)

    //skapar table med titlar.
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    titleTr.align = "center"
    let orderIdTitle = document.createElement("td")
    
    let orderDateTitle = document.createElement("td")
    let shippedTitle = document.createElement("td")
    // confirm knapp
    let confirmBtn = document.createElement("button")
    confirmBtn.addEventListener("click", updateShippingStatus)
    confirmBtn.style.height = "5vh"
    confirmBtn.innerText = "Apply changes, mark order(s) as recieved"  

    orderIdTitle.innerHTML = "<h3>OrderId</h3>"
    
    orderDateTitle.innerHTML = "<h3>Order Date</h3>"
    shippedTitle.innerHTML = "<h3>Recieved</h3>"
    
    titleTr.append(orderIdTitle, orderDateTitle, shippedTitle)
    myTable.append(titleTr)
    content.append(myTable, confirmBtn)

    getAllOrders.forEach(order => {
        
       /*  if(order.pending == null) { */
        let newRow = document.createElement("tr")
        newRow.align = "center"
        let orderId = document.createElement("td")
        
        
        let orderDate = document.createElement("td")
        let shipped = document.createElement("td")
        let checkbox = document.createElement("input")
        checkbox.className = "myCheckbox"
        checkbox.type = "checkbox"
        /* checkbox.style.width = "5vw"
        checkbox.style.height = "5vh" */

        checkbox.value = order.orderId
        orderId.innerText = order.orderId
        orderDate.innerText = order.orderDate
        
        
		if(order.pending == "1") { //Checkbox är checkad om användare är admin. 
            checkbox.checked = true 
			checkbox.type = "none"
			checkbox.value = "Mottagen"
			/* checkbox.style.width = "8vw"
        	checkbox.style.height = "5vh"
			checkbox.style.background = "#4CAF50" */
        }
		
        shipped.append(checkbox)
        newRow.append(orderId, orderDate, shipped)
        myTable.append(newRow)
        /* } */
        
    })  

}
async function updateShippingStatus() {
    let cb = document.getElementsByClassName("myCheckbox")
    let checkedArr = []
	let notCheckedArr = []
    for (let i = 0; i < cb.length; i++) {
        if(cb[i].checked) { 
            checkedArr.push(cb[i].value)           
         }else if(!cb[i].checked) {
            notCheckedArr.push(cb[i].value)
         }
    }       
           

    body = new FormData()
    body.set("checkedArr", JSON.stringify(checkedArr)) 
	body.set("notCheckedArr", JSON.stringify(notCheckedArr))    
    body.set("action", "pending")     
    
    const response = await makeReq("./api/recievers/orderReciever.php", "POST", body)
    console.log(response)
    loadOldOrders()
    return response 
}