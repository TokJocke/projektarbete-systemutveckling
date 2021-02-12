import {makeReq} from "./main.js"

window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")


function initSite() {
	if (body){
        getAllProducts()
        addProdBtn()
	}
}

async function getAllProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "GET")

    console.log(response)
}

async function addProducts() {
    const response = await makeReq("./api/recievers/productReciever.php", "POST")

    console.log(response)
}


async function addProdBtn() {

    let btn = document.getElementById("addProduct")

    btn.addEventListener("click", addProducts)
}