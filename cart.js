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

    console.log("från get",response)
    return response
}

/* async function addProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "POST")
    console.log(response)

} */

// skapar produktkorten i kundvagnen
async function renderProducts() {

    let allProducts = await getCart()
    let productWrapper = document.getElementById("testDiv")
    console.log("in render" , allProducts)
    let test = allProducts
    
    let testpris = 0
    let totalPriceDiv = document.createElement("h2")
    if (test) {
        for (let i = 0; i < test.length; i++) {
            totalPriceDiv.innerHTML = ""
            testpris += test[i].product.price

            console.log(test[i].product)
            console.log(test[i].product.price)
            totalPriceDiv.innerHTML += "Totalpris " + " " + testpris + " kr"
            body.append(totalPriceDiv) 
        
        }
    }
    
     

    allProducts.forEach(product => {
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("h3")
        let productPrice = document.createElement("h4")
        let productQuantity = document.createElement("p")
        let productImg = document.createElement("img")

        productTitle.innerText = product.product.name
        productPrice.innerText = product.product.price + "kr"
        productQuantity.innerText = product.quantity + "st"
        /* productImg.src = "./assets/product/" + products.img  */
        productDiv.className = "productBox"

        productDiv.append(productTitle,productPrice,productQuantity, productImg)
        productWrapper.append(productDiv)

    });



}
