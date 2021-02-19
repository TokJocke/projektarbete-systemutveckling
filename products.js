import {makeReq} from "./main.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        renderProducts()
/*         addProdBtn()
 */ 	}
}

export async function getAllProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "GET")

    console.log(response)
    return response
}

async function addProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "POST")
    console.log(response)

}

async function renderProducts() {

    let allProducts = await getAllProducts()
    let productWrapper = document.getElementById("testDiv")
    console.log("in render" , allProducts)

    allProducts.forEach(product => {
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("h2")
        let productDesc = document.createElement("p")
        let productPrice = document.createElement("h3")
        let productImg = document.createElement("img")

        productTitle.innerText = product.name
        productDesc.innerText = product.description
        productPrice.innerText = product.price + "kr"
        productImg.src = product.img
        productDiv.className = "productBox"

        productDiv.append(productTitle, productDesc, productPrice, productImg)
        productWrapper.append(productDiv)

    });



}





async function addProdBtn() {

    let btn = document.getElementById("addProduct")

    btn.addEventListener("click", addProducts)
}