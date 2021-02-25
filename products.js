import {makeReq} from "./main.js"
/* import {update} from "./cart.js" */

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        renderProducts()
        amountInCart()
        
        
        /* productPopUp()
        clickOutSideToClose() */
	}
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
        let moreInfoBtn = document.createElement("button")
        

        moreInfoBtn.addEventListener("click" , productPopUpDiv.bind(product,moreInfoBtn ))
        addToCartBtn.addEventListener("click", update.bind(product, "add"))
        
        productTitle.innerText = product.name
        /* productDesc.innerText = product.description */
        productPrice.innerText = product.price + "kr"
        productImg.src = product.img
        addToCartBtn.innerText = "Lägg till i Kundvagn"
        /* addToCartBtn.className = "fas fa-shopping-cart" */
        moreInfoBtn.innerText = "Mer Info"
        productDiv.className = "productBox"
        moreInfoBtn.id = "modalBtn"

        productDiv.append(productTitle, productImg, productPrice,addToCartBtn,moreInfoBtn)
        productWrapper.append(productDiv)

    });
}

async function productPopUpDiv (moreInfoBtn){
    
    let thisName = this.name
    let thisImg = this.img
    let thisPrice = this.price
    let thisDesc = this.description

    let divName = document.createElement("h3")
    let divImg = document.createElement("img")
    let divPrice = document.createElement("h5")
    let divDesc = document.createElement("p")

    divName.innerHTML = thisName
    divImg.src = thisImg
    divPrice.innerHTML = "Pris" + " "+ thisPrice + ":-"
    divDesc.innerHTML = thisDesc

    const product = document.getElementById("allProductBox")
    let modal = document.createElement("div")
    let content = document.createElement("div")
    let span = document.createElement("span")

    modal.className = "modal"
    content.className = "modal-content"
    span.className = "close"
    span.innerHTML = "&times;"
    
    content.append(span,divName,divImg,divPrice ,divDesc)
    modal.append( content)
    product.append(modal)

    spanOnClick(span,modal)
    windowOnClick(modal)
    btnClick(moreInfoBtn,modal)

}
async function btnClick(moreInfoBtn,modal){
// When the user clicks on the button, open the modal
moreInfoBtn.onclick = function() {
        modal.style.display = "block";
    }
}
async function spanOnClick(span,modal){
// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
}
async function windowOnClick(modal){
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
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
    amountInCart ()
    

}
// funktion som hämtar antalet produkter i cart och skriver ut på sidan vid cart ikonen
  async function amountInCart (){
    let cartdiv = document.getElementById("valueInCart")
    
    
    let response = await makeReq("./api/recievers/cartReciever.php?count", "GET",)
    console.log("amountInCart",response)
    

    cartdiv.innerHTML = response[0].antal
}





