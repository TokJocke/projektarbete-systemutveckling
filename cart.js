import {makeReq} from "./main.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")

function initSite() {
    if (body){
        renderProducts()
        getShippers()
        renderShippers()
	}
}



async function getCart() {
    const response = await makeReq("./api/recievers/cartReciever.php", "GET")
    console.log(response)
    return response
}



// skapar produktkorten i kundvagnen
async function renderProducts() {
    
    let cart = await getCart()
    let allProducts = cart.productList
    let productWrapper = document.getElementById("testDiv")
    productWrapper.innerHTML = ""
    console.log("response" , cart)
    

    
    allProducts.forEach(product => {
        
        
        //create elements
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("h3")
        let productPrice = document.createElement("h4")
        let productQuantity = document.createElement("h4")
        let productTotalPrice = document.createElement("p")
        let productImg = document.createElement("img")
        let productPlus = document.createElement("button")
        let productMinus = document.createElement("button")
        let productRemove = document.createElement("button")
        
        
        //set innertext
        
        productTitle.innerText = product.product.name
        productPrice.innerText = product.product.price + "kr/st"
        productTotalPrice.innerText = product.totalPrice + "kr"
        productQuantity.innerText = product.quantity + "st"
        productPlus.innerText = "+"
        productMinus.innerText = "-"
        productRemove.innerText = "Delete"
        //eventlisteners
        // här ändrar jag para "change" till action -> increase/decrease 
        productPlus.addEventListener("click", updateQuantity.bind(product, "increase"))
        productMinus.addEventListener("click", updateQuantity.bind(product, "decrease"))
        productRemove.addEventListener("click", updateQuantity.bind(product, "remove"))
        
        /* productImg.src = "./assets/product/" + product.product.img  */
        productDiv.className = "productBox"
        //append
        productDiv.append(productTitle,productPrice,productTotalPrice,productQuantity, productImg,productPlus, productMinus, productRemove)
        productWrapper.append(productDiv)
        
    });
    // creates div and print totalprice of the cart
    let totalPriceDiv = document.createElement("h2")
    totalPriceDiv.innerHTML += "Totaltpris " + " " + cart.totalPrice + " kr"
    productWrapper.append(totalPriceDiv)
    
    
}

//funktionen updaterar quantitet samt kan ta bort
async function updateQuantity (change){
    //svaret från this sparas i variable
    let thisProductID = this.productId
    let thisQuantity = this.quantity
    
    //skapar en body
    let body = new FormData()
    
    //appendar body med para "change"
    body.append("action", change)
    body.append("quantity", JSON.stringify(thisQuantity))
    body.append("productID", JSON.stringify(thisProductID))
    
    const response = await makeReq("./api/recievers/cartReciever.php", "POST", body)
    console.log(response)
    renderProducts()
    
}

    /**Hämtar alla fraktalternativ */
async function getShippers(){
    const response = await makeReq("./api/recievers/shipperReciever.php", "GET")
    console.log(response)
    return response
}

/** Renderar ut alla fraktalternativ. */
async function renderShippers(){
    const shippingDiv = document.getElementById("shippingDiv")
    const priceText = document.createElement("p")
    let shippers = await getShippers();
    shippingDiv.style.display = "flex"
   
    shippers.forEach((shipper) => {
        const nameText = document.createElement("h4")
        const priceText = document.createElement("p")
        const descText = document.createElement("p")
        const shipperName = shipper.shippingCompany;
        const description = shipper.description
        const shipperPrice = Number(shipper.shippingPrice).toLocaleString("sv-SE", {style: "currency", currency: "SEK"});

     
        const shipperOption = document.createElement("div")
        shipperOption.className = "shipperContainer"
        const shipperDesc = document.createElement("div")
        shipperDesc.className = "shipperDesc"
        nameText.innerText = shipperName
        descText.innerText = description
        priceText.innerText = shipperPrice
        
        shipperDesc.append(nameText,descText)
        shipperOption.append(shipperDesc,priceText)
        shippingDiv.append(shipperOption)

        shipperOption.addEventListener("click", myTest.bind(shipper))
    })

    
}

async function myTest(){
    
    let body = new FormData()
    let shippingId = this.shippingId
    body.set("shipper", shippingId)
    const response = await makeReq("./api/recievers/orderReciever.php", "POST", body)
    console.log(response)
}
