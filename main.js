window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")



function initSite() {
	if (body){
       
        
	}
}

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

//Ska nog tas bort
/* export function urlAndParam(myUrl, paramKey, paramvalue) {

    let url = myUrl
    let params = "?" + paramKey + "=" + paramvalue;
    console.log(url + params.toString())
    return url + params.toString()    
} */

export async function getAllCategorys() {
    const response = await makeReq("./api/recievers/categoryReciever.php", "GET")
    console.log(response)
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

export function removeElementById(myId){	
	var elem = document.getElementById(myId)
	elem.parentNode.removeChild(elem);	
} 