import {makeReq} from "./main.js"
/* import {update} from "./cart.js" */

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
    let productWrapper = document.getElementById("allProductBox")
    console.log("in render" , allProducts)

    allProducts.forEach(product => {
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("h2")
/*         let productDesc = document.createElement("p")
 */     let productPrice = document.createElement("h3")
        let productImg = document.createElement("img")
        let addToCartBtn = document.createElement("button")

        addToCartBtn.addEventListener("click", update.bind(product, "add"))
        
        productTitle.innerText = product.name
/*         productDesc.innerText = product.description
 */        productPrice.innerText = product.price + "kr"
        productImg.src = product.img
        addToCartBtn.innerText = "Lägg till i Kundvagn"
        productDiv.className = "productBox"

        productDiv.append(productTitle, productImg, productPrice,addToCartBtn)
        productWrapper.append(productDiv)

    });



}
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
    

}





