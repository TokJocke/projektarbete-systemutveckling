import {makeReq} from "./main.js"
import { amountInCart, testing } from "./products.js"
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
        return response
}



// skapar produktkorten i kundvagnen
async function renderProducts() {
    
        let cart = await getCart()
        let allProducts = cart[0].productList
        let allOffers = cart[1]
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

 
        if(cart[0] != false){

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
       
               productImg.src = "./assets/products/" + product.product.img
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
                  
        } 
        if(cart[1] != false) {
            allOffers.forEach(offer => {
                let offerTitleDiv = document.createElement("div")
                let offerTitle = document.createElement("h2")
                let productDiv = document.createElement("div")
                let productInfoDiv = document.createElement("div")
                let quantityDiv = document.createElement("div")
                let removeDiv = document.createElement("div")
                let productPlus = document.createElement("h4")
                let productMinus = document.createElement("h4")
                let productRemove = document.createElement("p")
                let productQuantity = document.createElement("h4")
    
                productInfoDiv.className = "descDiv"
                offerTitleDiv.className = "imgDiv"
                quantityDiv.className = "quantityDiv"
                removeDiv.className = "removeDiv"
                productInfoDiv.style.display = "flex"
                productInfoDiv.style.flexDirection = "column"
                productDiv.className = "cartProductBox"
                productPlus.innerText = "+" 
                productMinus.innerText = "-"
                productRemove.className = "fa fa-trash"
                productQuantity.innerText = offer.quantity
                
                productPlus.addEventListener("click", update.bind(offer, "increase"))
                productMinus.addEventListener("click", update.bind(offer, "decrease"))
                productRemove.addEventListener("click", update.bind(offer, "remove"))
    
                    offerTitle.innerText = offer.offerName


                    offerTitleDiv.append(offerTitle)
                    productDiv.append(offerTitleDiv)
                    quantityDiv.append(productPlus, productQuantity, productMinus)
                    removeDiv.append(productRemove)
    
                
                    renderOfferDetails(offer.offerName, productInfoDiv)
                    productDiv.append(productInfoDiv, quantityDiv, removeDiv)
                    productWrapper.append(productDiv)
                });
        }
        if (cart[0] == false && cart[1] == false) {
            checkoutDiv.innerHTML = ""
            const emptyText = document.createElement("h1")
            emptyText.style.textAlign = "center"
            emptyText.innerText = "Här var det tomt :("
            checkoutDiv.append(emptyText)  
        }
        else {

            renderTotalPrice(cart)
        }
            
        
           
         
}


async function offerTotalPrice(param) {
    let productsInOffer = await testing(param)
    let totalPrice = []
    let discount 
    productsInOffer.forEach(product => {

        totalPrice.push(product.price * product.quantity)
        discount = product.discount / 100

    })
    let calculatedTotal = totalPrice.reduce((total, currentValue)=>{
        return total + currentValue})
    let discountTotal = Math.floor(calculatedTotal - (calculatedTotal * discount))

    return discountTotal

 }



async function renderOfferDetails(param, parent) {

    let productsInOffer = await testing(param)
    let totalPrice = []
    let discount 


    productsInOffer.forEach(product => {
        let productName = document.createElement("p")
        productName.innerText = product.productName + " x " + product.quantity

        totalPrice.push(product.price * product.quantity)
        discount = product.discount / 100

        parent.append(productName)
    })
    let calculatedTotal = totalPrice.reduce((total, currentValue)=>{
        return total + currentValue})
    let discountTotal = Math.floor(calculatedTotal - (calculatedTotal * discount))
    let renderTotalPrice = document.createElement("p")
    let renderDiscountPrice = document.createElement("p")
    renderDiscountPrice.data = discountTotal
    
    renderTotalPrice.id="renderTotalPrice"
    renderTotalPrice.innerText = calculatedTotal + " kr"
    renderTotalPrice.style.textDecoration = "line-through"
    renderDiscountPrice.className="renderDiscountPrice"
    renderDiscountPrice.innerText = discountTotal + " kr"
    renderDiscountPrice.style.color = "red"

    let pricesArray = []

    pricesArray.push(calculatedTotal, discountTotal)
    

    parent.append(renderTotalPrice, renderDiscountPrice)
}


async function renderTotalPrice(cart){
    let allOffers = cart[1] 
    let allProducts = cart[0]
    let offerAndProductPrice = 0
	let productWrapper = document.getElementById("cartDiv") 
	let totalPriceDiv = document.createElement("div")
    totalPriceDiv.className = "totalPriceDiv"
    totalPriceDiv.innerHTML = ""
    let priceArray = []
    let calculatedPrice = 0
    productWrapper.append(totalPriceDiv)

    for(let i = 0; i < allOffers.length; i++) {

        let blaha = await offerTotalPrice(allOffers[i].offerName) * allOffers[i].quantity
        priceArray.push(blaha)

    }
     if(cart[1] != false) {
        calculatedPrice = priceArray.reduce((total, currentValue)=>{
           return total + currentValue})
    } 
    
    if(cart[0] != false) {
        offerAndProductPrice = allProducts.totalPrice  + calculatedPrice 
    }else {
        offerAndProductPrice = calculatedPrice
    }
    

	 if(!selectedShipper){
		 totalPriceDiv.innerHTML = `Totalt pris ${offerAndProductPrice.toLocaleString("sv-SE", {style: "currency", currency: "SEK"})}`
		 

	 }else {

		const headlineTxt = document.createElement("p")
		totalPriceDiv.innerHTML = `Totalt pris ${offerAndProductPrice.toLocaleString("sv-SE", {style: "currency", currency: "SEK"})}`
		const checkoutPrice = document.createElement("h4")
		const confirmOrderDiv = document.getElementById("confirmOrderDiv")
        confirmOrderDiv.innerHTML = ""
		headlineTxt.innerText = "Att betala ink frakt:"
		let totalSum = Number(selectedShipper.shippingPrice) + offerAndProductPrice
		checkoutPrice.innerText = totalSum.toLocaleString("sv-SE", {style: "currency", currency: "SEK"})
		confirmOrderDiv.append(headlineTxt,checkoutPrice)

        renderOrderbtn()
	 }
}

/**funktionen updaterar quantitet samt kan ta bort*/
async function update (change){
    //svaret från this sparas i variable

    if(change == "decrease" && this.quantity == 1){
        change = "remove"
    }

    let thisProductId = this.productId 
    if (thisProductId == null) {
        thisProductId = this.offerName
    }
    //skapar en body
    let body = new FormData()
    
    //appendar body med para "change"
    body.append("action", change)
    body.append("productId", JSON.stringify(thisProductId))
    
    const response = await makeReq("./api/recievers/cartReciever.php", "POST", body)  

    renderProducts()
    amountInCart()
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
    let cart = await getCart()
    if(!selectedShipper){
        alert("välj fraktmetod!")
    }else {
        body.set("action", "sendOrder")
        body.set("shipper", selectedShipper.shippingId);
        body.set("cart", JSON.stringify(cart))
        const response = await makeReq("./api/recievers/orderReciever.php", "POST", body)

        alert("Ordern skickades!")

        renderProducts()
				window.location = "./myPage.html"

      
    }
}

