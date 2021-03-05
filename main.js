import { getAllProducts, renderProducts, getAllProdsInCategory } from "./products.js"

/* window.addEventListener("load", initSite)
 */let body = document.getElementById("indexBody")



/* function initSite() {
	if (body){
       
        
	}
} */

export async function makeReq(path, method, body) {
    try {
        let response = await fetch(path, {
            method,
            body
        })
        return response.json()     
    }
     catch(err) {
          console.error("Failed fetch", err)
      } 
}


export async function getAllCategorys() {
    const response = await makeReq("./api/recievers/categoryReciever.php", "GET")
    return response
}

export async function getAllOffers() {
    const response = await makeReq("./api/recievers/offerReciever.php", "GET")
    return response
}

export async function createCategoryDropDown() {
    let allCategorys = await getAllCategorys()
    let mySelect = document.createElement("select")
    allCategorys.forEach(category => {
        let myOption = document.createElement("option")
        myOption.innerText = category.categoryId + " - " + category.name 
        myOption.value = category.categoryId
        mySelect.append(myOption) 
    })    
    /* appendTo.append(mySelect) */
    return mySelect
}

export async function createOfferDropDown() {
    let allOffers = await getAllOffers()
    let mySelect = document.createElement("select")
    allOffers.forEach(offer => {
        let myOption = document.createElement("option")
        myOption.innerText = offer.offerName 
        myOption.value = offer.offerName 
        mySelect.append(myOption) 
    })    
    /* appendTo.append(mySelect) */
    return mySelect
}

export function removeElementById(myId){	
	var elem = document.getElementById(myId)
	elem.parentNode.removeChild(elem);	
} 

export function saveFilterChocie(choice) {

    sessionStorage.setItem("productFilter", JSON.stringify(choice))


}

export function filterProducts(savedSession) {
    let filterChocie = JSON.parse(sessionStorage.getItem("productFilter"))
    let headline = document.getElementById("anchorProduct")
    if(!filterChocie || filterChocie == "Alla Produkter") {
        headline.innerText = filterChocie   
       
        renderProducts(getAllProducts())
      
    }
    else {
        headline.innerText = "Produkter > " + filterChocie.name   

        renderProducts(getAllProdsInCategory(filterChocie.categoryId))
    }

}

