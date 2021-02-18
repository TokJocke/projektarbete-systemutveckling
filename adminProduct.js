import {makeReq} from "./main.js"
import {getAllProducts} from "./products.js"

window.addEventListener("load", initSite)
let body = document.getElementById("adminProductBody")


function initSite() {
	if (body){
        myAdminBox()
        getAllProducts()
        getAllCategorys()
    }
}

async function getAllCategorys() {
    const response = await makeReq("./api/recievers/categoryReciever.php", "GET")

    console.log(response)
    return response
}

//Function to createTr for adminAddProductPanel
function createTr(name, myInput, myInputType, myEle, myTable) {
    let tr = document.createElement("tr")
    let td = document.createElement("td")
    let tdInput = document.createElement("td")
    let input = document.createElement(myInput)
    input.type = myInputType
    td.innerText = name    
    tdInput.append(input)
    tr.append(td, tdInput)
    myTable.append(tr)
    myEle.append(myTable)
}
//admin panel for adding products
async function adminAddProductPanel() {
    let adminProductBox = document.getElementById("adminProductBox")
    let myTable = document.createElement("table")
    //Name row with inputs
    let nameTr = document.createElement("tr")
    let nameTd = document.createElement("td")
    let nameInput = document.createElement("td")
    nameTd.innerText = "Name"
    nameInput.innerHTML = "<input type='text' id='nameInput'>" 
    //Price row with inputs
    let priceTr = document.createElement("tr")
    let priceTd = document.createElement("td")
    let priceInput = document.createElement("td")
    priceTd.innerText = "Price"
    priceInput.innerHTML = "<input type='number' id='priceInput'>" 
    //Description row with inputs
    let descTr = document.createElement("tr")
    let descTd = document.createElement("td")
    let descInput = document.createElement("td")
    descTd.innerText = "Description"
    descInput.innerHTML = "<textarea type='text' id='descInput'>" 
    //Category row with category select
    let categoryTr = document.createElement("tr")
    let categoryTd = document.createElement("td")
    let categoryInput = document.createElement("td")
    categoryTd.innerText = "Category"   
    //create dropdown "select" with options
    let allCategorys = await getAllCategorys()
    let mySelect = document.createElement("select")
    mySelect.id="categoryInput"
    allCategorys.forEach(category => {
        let myOption = document.createElement("option")
        myOption.innerText = category.categoryId + " - " + category.name 
        myOption.value = category.categoryId
        mySelect.append(myOption) 
    })    
    //create upload input for img
    let uploadImgTr = document.createElement("tr")
    let uploadImgTd = document.createElement("td")
    let uploadImgInput = document.createElement("td")
    uploadImgTd.innerText ="Upload Image"
    uploadImgInput.innerHTML = "<input type='file' name='image' id='uploadImgInput'>"    
    //create confirm button
    let confirmBtn = document.createElement("button")
    confirmBtn.innerText = "Confirm"
    confirmBtn.addEventListener("click", sendProductData)
    //All appends
    uploadImgTr.append(uploadImgTd, uploadImgInput)
    categoryInput.append(mySelect)
    categoryTr.append(categoryTd, categoryInput)
    descTr.append(descTd, descInput)
    nameTr.append(nameTd, nameInput)
    priceTr.append(priceTd, priceInput)
    myTable.append(nameTr, priceTr, descTr, categoryTr, uploadImgTr, confirmBtn)
    adminProductBox.append(myTable)
}
//admin panel for update / delete producs
async function adminUpdateProductPanel() {
    let allProducts = await getAllProducts()
    
    let adminBox = document.getElementById("adminProductBox")
    
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    let productIdTitleTd = document.createElement("td")
    let productNameTitleTd = document.createElement("td")
    let productPriceTitleTd = document.createElement("td")
    let productDescTitleTd = document.createElement("td")
    let productInStockTitleTd = document.createElement("td")
    let productCategoryTitleTd = document.createElement("td")
    
    titleTr.className="updatePanalTitleRow"
    productIdTitleTd.innerHTML = "<h3>Id</h3>"
    productNameTitleTd.innerHTML = "<h3>Name</h3>"
    productPriceTitleTd.innerHTML = "<h3>Price</h3>"
    productDescTitleTd.innerHTML = "<h3>Description</h3>"
    productInStockTitleTd.innerHTML = "<h3>In Stock</h3>"
    productCategoryTitleTd.innerHTML = "<h3>Category</h3>"
    
    titleTr.append(productIdTitleTd, productNameTitleTd, productPriceTitleTd, productDescTitleTd, productInStockTitleTd, productCategoryTitleTd)
    myTable.append(titleTr)
    adminBox.append(myTable)

    allProducts.forEach(product => {
        //every Td
        let newRow = document.createElement("tr")
        newRow.className="UpdatePanelProdRow"
        let productId = document.createElement("td")
        let productName = document.createElement("td")
        let productPrice = document.createElement("td")
        let productDesc = document.createElement("td")
        let productInStock = document.createElement("td")
        let productCategory = document.createElement("td")
        //Delete Button
        let deleteBtnTd = document.createElement("td")
        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        deleteBtn.addEventListener("click", deleteProduct.bind(product))
        //Edit Button
        let editBtnTd = document.createElement("td")
        let editBtn = document.createElement("button")
        editBtn.innerText = "Edit"
        editBtn.addEventListener("click", editProduct.bind(product))
        //Innertext
        productId.innerText = product.productId
        productName.innerText = product.name
        productPrice.innerText = product.price
        productDesc.innerText = product.description
        productInStock.innerText = product.unitsInStock
        productCategory.innerText = product.categoryId
        //Apends
        editBtnTd.append(editBtn)
        deleteBtnTd.append(deleteBtn)
        newRow.append(productId, productName, productPrice, productDesc, productInStock, productCategory, editBtnTd, deleteBtnTd)
        myTable.appendChild(newRow)
    })

    
}
function deleteProduct() {
    console.log("delete = ", this.productId)
}

function editProduct() {
    console.log("edit = ", this.productId)
}

//function for uploading image and sending product data
async function sendProductData() {   
    let inputName = document.getElementById("nameInput").value
    let inputPrice = document.getElementById("priceInput").value
    let inputDesc = document.getElementById("descInput").value
    let inputCategory = document.getElementById("categoryInput").value
    let image = document.getElementById("uploadImgInput")
    let productData = { inputName, inputPrice, inputDesc, inputCategory }
    productData = JSON.stringify(productData)
    
    let data = new FormData() 
    data.append("image", image.files[0])
    data.append("productData", productData)

    const response = await makeReq("./api/recievers/productReciever.php", "POST", data)
    console.log(response) 
}
//Dashboard for adding / updateing products
function myAdminBox() {
    let adminAddBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[0]
    let adminUppdateBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[1]
    let adminBox = document.getElementById("adminProductBox")
    adminAddProductPanel()

    adminAddBoxBtn.addEventListener("click", () => {
        console.log("add")
        adminBox.innerHTML = ""
        adminAddProductPanel()
    })

    adminUppdateBoxBtn.addEventListener("click", () => {
        console.log("uppdate")
        adminBox.innerHTML = ""
        adminUpdateProductPanel()
    })

    
}

