import {makeReq, getAllCategorys } from "./main.js"
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

function editProduct() {
    let main = document.getElementsByTagName("main")[0]

    console.log(main)
    let title = document.createElement("h2")
    title.innerText = this.name
    let popUpDiv = document.createElement("div")
    popUpDiv.id = "editPopUpDiv"

    let nameInput = document.createElement("input")
    nameInput.placeholder = this.name
    nameInput.className = "editPopUpInput"
    let priceInput = document.createElement("input")
    priceInput.placeholder = this.price
    priceInput.className = "editPopUpInput"
    let descInput = document.createElement("input")
    descInput.placeholder = this.description
    descInput.className = "editPopUpInput"
    let inStockInput = document.createElement("input")
    inStockInput.placeholder = this.unitsInStock
    inStockInput.className = "editPopUpInput"
    let categoryInput = document.createElement("input")
    categoryInput.placeholder = this.categoryId
    categoryInput.className = "editPopUpInput"

    let buttonContainer = document.createElement("div")

    let updateBtn = document.createElement("button")
    updateBtn.innerText="update"
    updateBtn.addEventListener("click", update)
    let cancelBtn = document.createElement("button")
    cancelBtn.innerText = "cancel"

    buttonContainer.append(updateBtn, cancelBtn)
    popUpDiv.append(title, nameInput, priceInput, descInput, inStockInput, categoryInput, buttonContainer)
    main.append(popUpDiv)
}


function update(name, price, desc, inStock, category) {
   let input = document.getElementsByTagName("input")

   console.log(input[0].placeholder)
/*     input.forEach(item => {
       console.log(item.placeholder)
   });  */
}



//function for uploading image and sending product data
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

    
}

