import {makeReq, getAllCategorys, createCategoryDropDown, removeElementById} from "./main.js"
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

//admin panel for adding products
async function adminAddProductPanel() {
    //*****Creating all content
    let adminProductBox = document.getElementById("adminProductBox")
    let myTable = document.createElement("table")
    let nameTr = document.createElement("tr")
    let nameTd = document.createElement("td")
    let nameInput = document.createElement("td")
    let priceTr = document.createElement("tr")
    let priceTd = document.createElement("td")
    let priceInput = document.createElement("td")
    let descTr = document.createElement("tr")
    let descTd = document.createElement("td")
    let descInput = document.createElement("td")
    let categoryTr = document.createElement("tr")
    let categoryTd = document.createElement("td")
    let categoryInput = document.createElement("td")
    let categoryDropDown = await createCategoryDropDown()
    let buttonDiv = document.createElement("div")
    let uploadImg = document.createElement("input")
    let confirmBtn = document.createElement("button")
    //*****All properties
    myTable.id = "addProductTabel"
    nameTd.innerText = "Name"
    nameInput.innerHTML = "<input type='text' id='nameInput'>" 
    priceTd.innerText = "Price"
    priceInput.innerHTML = "<input type='number' id='priceInput'>" 
    descTd.innerText = "Description"
    descInput.innerHTML = "<textarea type='text' id='descInput'>" 
    categoryTd.innerText = "Category"   
    categoryDropDown.id = "categoryInput"
    uploadImg.type = "file"
    uploadImg.name = "image"
    uploadImg.id="uploadImgInput"
    confirmBtn.innerText = "Confirm"
    confirmBtn.addEventListener("click", sendProductData)
    //*****All appends
    buttonDiv.append(uploadImg, confirmBtn)
    categoryInput.append(categoryDropDown)
    categoryTr.append(categoryTd, categoryInput)
    descTr.append(descTd, descInput)
    nameTr.append(nameTd, nameInput)
    priceTr.append(priceTd, priceInput)
    myTable.append(nameTr, priceTr, descTr, categoryTr)
    adminProductBox.append(myTable, buttonDiv)  
}

//admin panel for update / delete producs
async function adminUpdateProductPanel() {
    let allProducts = await getAllProducts() 
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
  
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
//Panel for Createing/appending offers
async function adminOfferPanel() {
    let allProducts = await getAllProducts() 
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
  
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    let productIdTitleTd = document.createElement("td")
    let productNameTitleTd = document.createElement("td")
    let productPriceTitleTd = document.createElement("td")
    let productInStockTitleTd = document.createElement("td")
    let addToOfferTitleTd = document.createElement("td")
    
    titleTr.className="updatePanalTitleRow"
    productIdTitleTd.innerHTML = "<h3>Id</h3>"
    productNameTitleTd.innerHTML = "<h3>Name</h3>"
    productPriceTitleTd.innerHTML = "<h3>Price</h3>"
    productInStockTitleTd.innerHTML = "<h3>In Stock</h3>"
    addToOfferTitleTd.innerHTML = "<h3>add to offer</h3>"
    
    titleTr.append(productIdTitleTd, productNameTitleTd, productPriceTitleTd, productInStockTitleTd, addToOfferTitleTd)
    myTable.append(titleTr)
    adminBox.append(myTable)

    allProducts.forEach(product => { 
        //every Td
        let newRow = document.createElement("tr")
        newRow.className="UpdatePanelProdRow"
        let productId = document.createElement("td")
        let productName = document.createElement("td")
        let productPrice = document.createElement("td")
        let productInStock = document.createElement("td")
        let addToOffer = document.createElement("td")
                
        let checkBox = document.createElement("input")
        checkBox.className = "offerCheck"
        checkBox.type = "checkbox"
        checkBox.style.width = "5vw"
        checkBox.style.height = "5vh" 
        checkBox.value = product
    





        //Innertext
        addToOffer.append(checkBox)
        productId.innerText = product.productId
        productName.innerText = product.name
        productPrice.innerText = product.price
        productInStock.innerText = product.unitsInStock
        //Apends
        newRow.append(productId, productName, productPrice, productInStock, addToOffer)
        myTable.appendChild(newRow)
    })

    
}

//Function for deleting products from DB
async function deleteProduct() {
    if (confirm("are you sure you want to delete " + this.name + " from products?")) {        
        let data = new FormData()
        data.append("action", "removeProduct")
        data.append("product", JSON.stringify(this))
    
        const response = await makeReq("./api/recievers/productReciever.php", "POST", data)
        adminUpdateProductPanel()
        console.log(response)
    } 
    
}


//Creating popUp for editing products
async function editProduct() {
    
    let main = document.getElementsByTagName("main")[0]
    let title = document.createElement("h2")
    let popUpDiv = document.createElement("div")
    let nameInput = document.createElement("input")
    let priceInput = document.createElement("input")
    let descInput = document.createElement("input")
    let inStockInput = document.createElement("input")
    let categoryInput = await createCategoryDropDown()
    let buttonContainer = document.createElement("div")
    let updateBtn = document.createElement("button")
    let cancelBtn = document.createElement("button")

    popUpDiv.id = "editPopUpDiv"
    nameInput.className = "editPopUpInput"
    priceInput.className = "editPopUpInput"
    descInput.className = "editPopUpInput"
    inStockInput.className = "editPopUpInput"
    categoryInput.id = "editPopUpCategory"
    
    title.innerText = this.name
    nameInput.placeholder = this.name
    priceInput.placeholder = this.price
    descInput.placeholder = this.description
    inStockInput.placeholder = this.unitsInStock
    updateBtn.innerText="update"
    cancelBtn.innerText = "cancel"
    
    priceInput.type = "number"
    inStockInput.type = "number"

    updateBtn.addEventListener("click", update.bind(this))//Alternativ lösning för att gå runt att funktionen kallas vid init    
    cancelBtn.addEventListener("click", cancel)           //==.onclick = () => { update(this.productId); }; okej eller dödssynd?

    buttonContainer.append(updateBtn, cancelBtn)
    popUpDiv.append(title, nameInput, priceInput, descInput, inStockInput, categoryInput, buttonContainer)
    main.append(popUpDiv)
}

//Function for updateing products in DB
async function update() {
    console.log(this.productId)//Med .bind lösning blir denna "this.productId"
    let input = document.getElementsByTagName("input")
    let myInputValueArray = []
    let inputCategory = document.getElementById("editPopUpCategory")
    for(let i = 0; i < input.length; i++) {
        if(input[i].value != "") {
            myInputValueArray.push(input[i].value)
        }
        else {
            myInputValueArray.push(input[i].placeholder)
        }  
    }
    myInputValueArray.push(inputCategory.value)    
    myInputValueArray.push(this.productId)//Med .bind lösning blir denna "this.productId"   
    let data = new FormData()
    data.append("action", "updateProduct")
    data.append("product", JSON.stringify(myInputValueArray))

    const response = await makeReq("./api/recievers/productReciever.php", "POST", data)
    console.log("response = ", response)
  
    removeElementById("editPopUpDiv")
    adminUpdateProductPanel()

}
//Close popup window
function cancel() {
    removeElementById("editPopUpDiv")
}

//function for sending product data and uploading image 
async function sendProductData() {   
    let inputName = document.getElementById("nameInput").value
    let inputPrice = document.getElementById("priceInput").value
    let inputDesc = document.getElementById("descInput").value
    let inputCategory = document.getElementById("categoryInput").value
    let image = document.getElementById("uploadImgInput")
    let productData = { inputName, inputPrice, inputDesc, inputCategory }
/*     productData = JSON.stringify(productData)
 */    
    let data = new FormData() 
    data.append("image", image.files[0])
    data.append("productData", JSON.stringify(productData))

    const response = await makeReq("./api/recievers/productReciever.php", "POST", data)
    console.log(response) 
}
//Dashboard for adding / updateing products
function myAdminBox() {
    let adminUppdateBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[0]
    let adminAddBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[1]
    let adminOfferBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[2]
    let adminBox = document.getElementById("adminProductBox")
    adminUpdateProductPanel()

    adminAddBoxBtn.addEventListener("click", () => {
        console.log("add")
        adminBox.innerHTML = ""
        adminAddProductPanel()
    })

    adminUppdateBoxBtn.addEventListener("click", () => {
        console.log("uppdate")
        adminUpdateProductPanel()
    })

    adminOfferBoxBtn.addEventListener("click", () => {
        console.log("Offers")
        adminOfferPanel()
    })

    
}

