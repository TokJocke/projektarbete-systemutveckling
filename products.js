import {getAllOffers, makeReq} from "./main.js"
import {currentUser} from "./myPage.js" 

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){

        amountInCart()
        currentUser()
        getAllProdsInCategory()
        getAllProducts()     
        /*  productPopUp()
        clickOutSideToClose()  */
	}
} 



export async function getAllProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "GET")
    return response
}

export async function getAllProdsInCategory(id) {

    const response = await makeReq("./api/recievers/productReciever.php?category=" + id,  "GET")
    return response
}

export async function getAllProdsInOffer(name) {

    const response = await makeReq("./api/recievers/productReciever.php?offer=" + name,  "GET")
    return response
}

async function testing(name) {

        const response = await makeReq("./api/recievers/offerReciever.php?testing=" + name,  "GET")
        return response
    
}



async function addProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "POST")

}

export async function renderProducts(fromWhere) {
    const userCheck = await makeReq("./api/recievers/userReciever.php?checkUser", "GET")

    let allProducts = await fromWhere
    let productWrapper = document.getElementById("allProductBox")
    //productWrapper.innerHTML = "" // Kanske lägga denna någon annanstans

    allProducts.forEach(product => {
        let productDivWrapper = document.createElement("div")
        let productDiv = document.createElement("div")
        let productTitle = document.createElement("h3")
        let productPrice = document.createElement("h3")
        let productImg = document.createElement("img")
        let addToCartBtn = document.createElement("button")

        let p = document.createElement("p")
        p.innerText = "Logga in"
        p.style.fontSize = "0.7rem"
        let myBtn = document.createElement("div")
        myBtn.className = "addToCartBtn"
        myBtn.append(p)
         

        productDiv.addEventListener("click" , productPopUpDiv.bind(product,productDiv ))
        
        addToCartBtn.addEventListener("click", update.bind(product, "add"))
        
        productTitle.innerText = product.name
        /* productDesc.innerText = product.description */
        productPrice.innerText = product.price + "kr"
        productImg.src = product.img
        addToCartBtn.innerText = "Lägg till i Kundvagn"
        addToCartBtn.className = "addToCartBtn"
        
        productDiv.className = "productBox"
        productDivWrapper.className = "productBoxWrapper"

        
        productDiv.append(productTitle, productImg, productPrice)
       
        if(userCheck === "NotLogged") {
            productDivWrapper.append(productDiv, myBtn)
           
        }
        
        else if(userCheck === "Logged") {
            productDivWrapper.append(productDiv, addToCartBtn)
        }
         if(product.unitsInStock <= 0 ){
            addToCartBtn.innerText = "Tillfälligt slut"        
        }
    
        /* productDivWrapper.append(productDiv, addToCartBtn) */
        productWrapper.append(productDivWrapper)
        
    });
}


async function productPopUpDiv (productDiv){
    
    let thisName = this.name
    let thisImg = this.img
    let thisPrice = this.price
    let thisDesc = this.description
    let thisUnitsInStock = this.unitsInStock

    let divName = document.createElement("h2")
    let divImg = document.createElement("img")
    let divPrice = document.createElement("h3")
    let divStock = document.createElement("p")
    let divDesc = document.createElement("p")

    divName.innerHTML = thisName
    divImg.src = thisImg
    divPrice.innerHTML = "Pris" + " "+ thisPrice + ":-"
    divStock.innerHTML = "Lagerstatus"+ " " + thisUnitsInStock
    divDesc.innerHTML = thisDesc

    const product = document.getElementById("allProductBox")
    let modal = document.createElement("div")
    let content = document.createElement("div")
    let span = document.createElement("span")

    modal.className = "modal"
    /* modal.id = "modalBtn" */
    content.className = "modal-content"
    span.className = "close"
    span.innerHTML = "&times;"
    modal.style.display = "block";
    
    content.append(span,divName,divImg,divPrice, divStock,divDesc)
    modal.append( content)
    product.append(modal)

    spanOnClick(span,modal)
    windowOnClick(modal)
    

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
    let thisUnitsInStock = this.unitsInStock
    if(thisUnitsInStock <= 0){
        
        return alert("produkten är tyvärr slut")
    }
    let thisProductId = this.productId
    
    
    //skapar en body
    let body = new FormData()
    
    //appendar body med para "change"
    body.append("action", change)
    body.append("productId", JSON.stringify(thisProductId))
    
    const response = await makeReq("./api/recievers/cartReciever.php", "POST", body)
    
    amountInCart ()
    

}
// funktion som hämtar antalet produkter i cart och skriver ut på sidan vid cart ikonen
  export async function amountInCart(){
    let cartdiv = document.getElementById("valueInCart")
    
    const userCheck = await makeReq("./api/recievers/userReciever.php?checkUser", "GET")
    if(userCheck === "Logged") {
        let response = await makeReq("./api/recievers/cartReciever.php?count", "GET",)
        cartdiv.innerHTML = response[0].antal
    }
  
    else {
        cartdiv.innerHTML = ""
    }
}

    export async function renderProductsInOffer() {
        let allOffers = await getAllOffers()
        let discountBox = document.getElementsByClassName("discountItems")[0]
         
        allOffers.forEach(offer => {
            let offerDiv = document.createElement("div")
            let offerName = document.createElement("h2")   
            
            createProdFromOffer(offer.offerName, offerDiv)

            offerName.innerText = offer.offerName
            offerDiv.append(offerName)
            discountBox.append(offerDiv)

        });

    }

    async function createProdFromOffer(param, parent) {
        let allProdsFromOffer = await testing(param)
        let priceArr = []
        
        
        allProdsFromOffer.forEach(product => {
            let name = document.createElement("p")
            name.innerText = product.productName + " x " + product.quantity
            
            parent.append(name)
        });

    }


