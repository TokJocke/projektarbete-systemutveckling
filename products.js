import {makeReq} from "./main.js"

 window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        getAllProdsInCategory()
        getAllProducts()
	}
} 

export async function getAllProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "GET")
    return response
}

export async function getAllProdsInCategory(id) {

    const response = await makeReq("./api/recievers/productReciever.php?id=" + id,  "GET")
    return response
}



async function addProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "POST")
    console.log(response)

}

export async function renderProducts(fromWhere) {

    let allProducts = await fromWhere
    let productWrapper = document.getElementById("allProductBox")
    console.log("in render" , allProducts)

    allProducts.forEach(product => {
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("h3")
/*         let productDesc = document.createElement("p")
 */        let productPrice = document.createElement("h3")
        let productImg = document.createElement("img")

        productTitle.innerText = product.name
/*         productDesc.innerText = product.description
 */        productPrice.innerText = product.price + "kr"
        productImg.src = product.img
        productDiv.className = "productBox"

        productDiv.append(productTitle, productImg, productPrice)
        productWrapper.append(productDiv)

    });



}





async function addProdBtn() {

    let btn = document.getElementById("addProduct")

    btn.addEventListener("click", addProducts)
}