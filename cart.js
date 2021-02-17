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

/* async function addProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "POST")
    console.log(response)

} */
/* let test = [1,2,3,4]

const sum = test.reduce(
    (accumulator, currentValue)=> accumulator + currentValue);
    console.log(sum) */

// skapar produktkorten i kundvagnen
async function renderProducts() {

    let cart = await getCart()
    let allProducts = cart.productList
    let productWrapper = document.getElementById("testDiv")
    console.log("response" , cart)
    console.log("ett steg under" , allProducts)

   // creates div and print totalprice of the cart
    let totalPriceDiv = document.createElement("h2")
    totalPriceDiv.innerHTML += "Totaltpris " + " " + cart.totalPrice + " kr"
    body.append(totalPriceDiv)

    allProducts.forEach(product => {
        console.log(product.product)
        
        //create elements
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("h3")
        let productPrice = document.createElement("h4")
        let productQuantity = document.createElement("p")
        let productImg = document.createElement("img")
        //set innertext
        productTitle.innerText = product.product.name
        productPrice.innerText = product.product.price + "kr"
        productQuantity.innerText = product.quantity + "st"
        /* productImg.src = "./assets/product/" + product.product.img  */
        productDiv.className = "productBox"
        //append
        productDiv.append(productTitle,productPrice,productQuantity, productImg)
        productWrapper.append(productDiv)

    });
    
    
}
    

