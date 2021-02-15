import {makeReq} from "./main.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        renderProducts()
       
	}
}

async function getCart() {
    const response = await makeReq("./api/recievers/orderReciever.php", "GET")

    console.log("från get",response)
    return response
}

async function addProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "POST")
    console.log(response)

}
// skapar produktkorten i kundvagnen, OBS lägg till bilderna i assets mappen
async function renderProducts() {

    let allProducts = await getCart()
    let productWrapper = document.getElementById("testDiv")
    console.log("in render" , allProducts)

    allProducts.forEach(product => {
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("h2")
        let productPrice = document.createElement("h3")
        let productQuantity = document.createElement("p")
        let productImg = document.createElement("img")

        productTitle.innerText = product.name
        productPrice.innerText = product.price + "kr"
        productQuantity.innerText = product.quantity + "st"
        productImg.src = "./assets/products/" + product.img
        productDiv.className = "productBox"

        productDiv.append(productTitle,productPrice,productQuantity, productImg)
        productWrapper.append(productDiv)

    });

    //totalpris
    async function renderTotalPrice(){
        let totalPriceDiv = document.createElement("h2")
        totalPriceDiv.innerHTML = "Totalpris"
        body.append(totalPriceDiv)
    }
    renderTotalPrice()



}
