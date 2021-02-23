import {makeReq} from "./main.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        renderProducts()
        
        
	}
}

async function getCart() {
    const response = await makeReq("./api/recievers/cartReciever.php", "GET")

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
        productPlus.addEventListener("click", update.bind(product, "increase"))
        productMinus.addEventListener("click", update.bind(product, "decrease"))
        productRemove.addEventListener("click", update.bind(product, "remove"))
        
        productImg.src = "./assets/product/" + product.product.img 
        productDiv.className = "productBox"
        //append
        productDiv.append(productImg, productTitle,productPrice,productMinus,productQuantity,productPlus, productTotalPrice, productRemove)
        productWrapper.append(productDiv)

    });
    // creates div and print totalprice of the cart
    let totalPriceDiv = document.createElement("h2")
    totalPriceDiv.innerHTML += "Totaltpris " + " " + cart.totalPrice + " kr"
    productWrapper.append(totalPriceDiv)
    
    
}

//funktionen updaterar quantitet samt kan ta bort
async function update (change){
    //svaret från this sparas i variable
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
