import {makeReq} from "./main.js"
//import { headerLinks, growHeader, filterProducts, headerNavBtn } from "./FrontendMain.js"
import { amountInCart } from "./products.js"
import { currentUser } from "./myPage.js"

window.addEventListener("load", initSite)
let body = document.getElementById("cartPageBody")

function initSite() {
    if (body){

        renderProducts()
        getShippers()
        renderShippers()
        amountInCart() 
        currentUser()    
	
    }

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
    let productWrapper = document.getElementById("testDiv")
    productWrapper.innerHTML = ""
    console.log("response" , cart)
    

    
    allProducts.forEach(product => {
        
        
        //create elements
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("p")
        let productPrice = document.createElement("p")
        let productQuantity = document.createElement("p")
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
        
        //eventlisteners

                         // här ändrar jag para "change" till action -> increase/decrease 
        productPlus.addEventListener("click", update.bind(product, "increase"))
        productMinus.addEventListener("click", update.bind(product, "decrease"))
        productRemove.addEventListener("click", update.bind(product, "remove"))

        
        productImg.src = "./assets/product/" + product.product.img 
        productDiv.className = "cartProductBox"
        productRemove.className = "fa fa-trash"
        //append
        productDiv.append(productImg, productTitle,productPrice,productMinus,productQuantity,productPlus, productTotalPrice, productRemove)
        productWrapper.append(productDiv)
        
    });
    // creates div and print totalprice of the cart
   /*  let totalPriceDiv = document.getElementById("totalPrice")
    totalPriceDiv.innerHTML += "Totaltpris " + " " + cart.totalPrice + " kr" */
    /* productWrapper.append(totalPriceDiv) */
    
    renderTotalPrice(cart)
    
    
    
}

async function renderTotalPrice(cart){

    let productWrapper = document.getElementById("testDiv")
    
    let totalPriceDiv = document.createElement("div")
    totalPriceDiv.innerHTML = "Totaltpris " + " " + cart.totalPrice + " kr"
    productWrapper.append(totalPriceDiv)
}

//funktionen updaterar quantitet samt kan ta bort
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
    console.log(response)
    return response
}

/** Renderar ut alla fraktalternativ. */
async function renderShippers(){
    const shippingDiv = document.getElementById("shippingDiv")
    let shippers = await getShippers();
    shippingDiv.style.display = "flex"
   
    shippers.forEach((shipper) => {
        const shipperInput = document.createElement("input")
        shipperInput.id = "shipperChoice" 
        shipperInput.value = shipper.shippingId
        shipperInput.name = "shipperChoice"
        shipperInput.type = "radio"
        shipperInput.style.display = "none" 
        const shipperList = document.createElement("div")
        const nameText = document.createElement("h5")
        const priceText = document.createElement("p")
        const descText = document.createElement("p")
        const labelDiv = document.createElement("div")
        const shipperName = shipper.shippingCompany
        const description = shipper.description
        const shipperPrice = Number(shipper.shippingPrice).toLocaleString("sv-SE", {style: "currency", currency: "SEK"})

        const shipperOption = document.createElement("label")
        shipperOption.className = "shipperContainer"
        shipperOption.id = "shipperContainer"
        
      
        nameText.innerText = shipperName
        descText.innerText = description
        priceText.innerText = shipperPrice  
        labelDiv.append(nameText,descText)
        
       
        shipperOption.append(shipperInput,labelDiv,priceText)
        shipperList.append(shipperOption)
        shippingDiv.append(shipperList)

        shipperOption.addEventListener("click", getValue)
        

    })
  
}

function getValue(){  
    const values = document.getElementsByName("shipperChoice") 
    let selectedShipper;
    values.forEach(value => {
        value.checked == true ?
        selectedShipper = value.value : 
        selectedShipper == null 
        });
        return selectedShipper
}


const ship = document.getElementById("shipper")
ship.addEventListener("click", myTest)


async function myTest(){
    let body = new FormData()
    let selectedShipper = getValue()
    selectedShipper == null ? alert("du måste välja fraktmetod") : body.set("shipper", selectedShipper);
    body.set("action", "sendOrder")

    const response = await makeReq("./api/recievers/orderReciever.php", "POST", body)
   
}

