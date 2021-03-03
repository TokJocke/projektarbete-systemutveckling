import {makeReq} from "./main.js"
import { amountInCart } from "./products.js"
import { currentUser } from "./myPage.js"
import { Newsletter, hideNewsInputs } from "./user.js"

window.addEventListener("load", initSite)
let body = document.getElementById("cartPageBody")
let selectedShipper;

function initSite() {
    if (body){
				renderShippers()
        renderProducts()
        amountInCart() 
        currentUser() 
        hideNewsInputs()

        signUpNews()   
    }
}

async function signUpNews() {
    let newsBtn = document.getElementById("newsBtn")
    newsBtn.addEventListener("click", Newsletter)
}


async function getCart() {
    const response = await makeReq("./api/recievers/cartReciever.php", "GET")
    console.log("i get", response)
        return response
}



// skapar produktkorten i kundvagnen
async function renderProducts() {
    
        let cart = await getCart()
        let allProducts = cart.productList
        let productWrapper = document.getElementById("cartDiv")
        let checkoutDiv = document.getElementById("checkoutDiv")
        let btn = document.getElementById("confirmOrderDiv")
        btn.innerHTML = ""
        productWrapper.innerHTML = ""
				const headline = document.createElement("h1")
				headline.innerText = "Din kundvagn"
				productWrapper.append(headline)
				const headlineDiv = document.createElement("div")
				headlineDiv.className = "headlineDiv"
				const headlineOne = document.createElement("div")
				headlineOne.className = "headlineOne"
				const headlineTwo = document.createElement("div")
				headlineTwo.className = "headlineTwo"

				headlineOne.innerText = "Produkter"
				headlineTwo.innerText = "Antal"
				headlineDiv.append(headlineOne,headlineTwo)

				productWrapper.append(headlineDiv)

        if(!cart){
            console.log("gör detta")
        		checkoutDiv.innerHTML = ""
           const emptyText = document.createElement("h1")
           emptyText.style.textAlign = "center"
           emptyText.innerText = "Här var det tomt :("
           checkoutDiv.append(emptyText)
        }else{

            allProducts.forEach(product => {
                
                //create elements
                let productDiv = document.createElement("div")
                let imgDiv = document.createElement("div")
                let descDiv = document.createElement("div")
                let quantityDiv = document.createElement("div")
                let removeDiv = document.createElement("div")
                let productTitle = document.createElement("h5")
                let productPrice = document.createElement("p")
                let productQuantity = document.createElement("h4")
                let productTotalPrice = document.createElement("p")
                let productImg = document.createElement("img")
                let productPlus = document.createElement("h4")
                let productMinus = document.createElement("h4")
                let productRemove = document.createElement("p")
        
                //classnames
                imgDiv.className = "imgDiv"
                descDiv.className = "descDiv"
                quantityDiv.className = "quantityDiv"
                removeDiv.className = "removeDiv"

                //set innertext
                productTitle.innerText = product.product.name
                productPrice.innerText = product.product.price.toLocaleString("sv-SE", {style: "currency", currency: "SEK"})
                productTotalPrice.innerText = product.totalPrice.toLocaleString("sv-SE", {style: "currency", currency: "SEK"})
                productQuantity.innerText = product.quantity 
                productPlus.innerText = "+" 
                productMinus.innerText = "-"
                
                //eventlisteners
                                 // här ändrar jag para "change" till action -> increase/decrease 
                productPlus.addEventListener("click", update.bind(product, "increase"))
                productMinus.addEventListener("click", update.bind(product, "decrease"))
                productRemove.addEventListener("click", update.bind(product, "remove"))
        
                productImg.src = "./assets/product/" + product.product.img 
                productDiv.className = "cartProductBox"
                productRemove.className = "fa fa-trash"
                
                //append
                imgDiv.append(productImg)
                descDiv.append(productTitle, productPrice)
                quantityDiv.append(productPlus,productQuantity, productMinus)
                removeDiv.append(productRemove)
        
        
                productDiv.append(imgDiv,descDiv,quantityDiv,removeDiv)
                productWrapper.append(productDiv)
                
            });     
					
            renderTotalPrice(cart)
            renderOrderbtn()
        }
}

async function renderTotalPrice(cart){
	let productWrapper = document.getElementById("cartDiv") 
	let totalPriceDiv = document.createElement("div")
	totalPriceDiv.className = "totalPriceDiv"
	

	 if(!selectedShipper){
		 totalPriceDiv.innerHTML = `Totalt pris ${cart.totalPrice.toLocaleString("sv-SE", {style: "currency", currency: "SEK"})}`
		 productWrapper.append(totalPriceDiv)

	 }else {
		const headlineTxt = document.createElement("p")
		totalPriceDiv.innerHTML = `Totalt pris ${cart.totalPrice.toLocaleString("sv-SE", {style: "currency", currency: "SEK"})}`
		productWrapper.append(totalPriceDiv)
		const checkoutPrice = document.createElement("h4")
	
		const confirmOrderDiv = document.getElementById("confirmOrderDiv")

		headlineTxt.innerText = "Att betala ink frakt:"
		let totalSum = Number(selectedShipper.shippingPrice) + cart.totalPrice
		checkoutPrice.innerText = totalSum.toLocaleString("sv-SE", {style: "currency", currency: "SEK"})
		confirmOrderDiv.append(headlineTxt,checkoutPrice)
	 }
}

/**funktionen updaterar quantitet samt kan ta bort*/
async function update (change){
    //svaret från this sparas i variable
    if(change == "decrease" && this.quantity == 1){
        change = "remove"
    }
    let thisProductId = this.productId
    console.log(thisProductId)
    //skapar en body
    let body = new FormData()
    
    //appendar body med para "change"
    body.append("action", change)
    body.append("productId", JSON.stringify(thisProductId))
    
    const response = await makeReq("./api/recievers/cartReciever.php", "POST", body)
    console.log(response)
    
    renderProducts()

}

    /**Hämtar alla fraktalternativ */
async function getShippers(){
    const response = await makeReq("./api/recievers/shipperReciever.php", "GET")
    return response
}

/** Renderar ut alla fraktalternativ. */
async function renderShippers(){
    const shippingDiv = document.getElementById("shippingDiv")
		const headline = document.createElement("h1")
    let shippers = await getShippers();
    shippingDiv.style.display = "flex"
    shippingDiv.innerHTML = ""
		headline.innerText = "Fraktalternativ"
		shippingDiv.append(headline)
   
    shippers.forEach((shipper) => {
        //create inputElement
        const shipperInput = document.createElement("input")
        shipperInput.id = shipper.shippingCompany
      /*   shipperInput.value = shipper.shippingId */
        shipperInput.name = "shipperChoice"
        shipperInput.className = "shipperChoice"
        shipperInput.type = "radio"
     
        //createElements
        const shipperList = document.createElement("div")
        const nameText = document.createElement("h5")
        const priceText = document.createElement("p")
        const descText = document.createElement("p")
        const labelDiv = document.createElement("div")
        labelDiv.className = "labelDiv"
        
        //shipperInfo
        const shipperName = shipper.shippingCompany
        const description = shipper.description
        const shipperPrice = Number(shipper.shippingPrice).toLocaleString("sv-SE", {style: "currency", currency: "SEK"})
        const shipperOption = document.createElement("label")
        shipperOption.className = "shipperContainer"

        //
        nameText.innerText = shipperName
        descText.innerText = description
        priceText.innerText = shipperPrice  
        labelDiv.append(nameText,descText,priceText)
        
       
        shipperOption.append(labelDiv,shipperInput)
        shipperList.append(shipperOption)
        shippingDiv.append(shipperList)

        shipperOption.addEventListener("click", getShipperInfo.bind(shipper))
    })
}


//** Hämtar Id från valt frakt*/
function getShipperInfo(){  
	renderProducts()
	 return selectedShipper = this
} 

//** skapar orderknapp  */
function renderOrderbtn(){
  const confirmOrderDiv = document.getElementById("confirmOrderDiv")
  confirmOrderDiv.id = "confirmOrderDiv"
  const orderBtn = document.createElement("div")
  orderBtn.className = "defaultBtn"
  orderBtn.innerText = "Slutför köp"  
  let checkoutDiv = document.getElementById("checkoutDiv")
  confirmOrderDiv.append(orderBtn)
  checkoutDiv.append(confirmOrderDiv)
  orderBtn.addEventListener("click", sendOrder)
}

//** Skapar order */
async function sendOrder(){
    let body = new FormData()
    if(!selectedShipper){
        alert("välj fraktmetod!")
    }else {
        body.set("action", "sendOrder")
        body.set("shipper", selectedShipper.shippingId);
        const response = await makeReq("./api/recievers/orderReciever.php", "POST", body)

        alert(response)

        renderProducts()
				window.location = "./myPage.html"

        console.log(response)
      
    }
}
/* async function test() {
    const response = await makeReq("./api/recievers/orderReciever.php?test", "GET")
    console.log("test response = ", response)
        return response
} */




