import {makeReq, getAllCategorys, createCategoryDropDown, getAllOffers, createOfferDropDown, removeElementById} from "./main.js"
import {getAllProducts, getAllProdsInOffer} from "./products.js"



/*****       ADMIN DASHBOARD     *****/

export function myAdminBox() {
/*     let adminUppdateBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[0]
    let adminAddBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[1]
    let adminOfferBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[2]
    let adminOrderBtn = document.getElementsByClassName("adminProductBoxBtn")[3]
    let adminUserBtn = document.getElementsByClassName("adminProductBoxBtn")[4] */
    const myPageDiv = document.getElementById("myPageContent")
    
    let adminProductWrapp = document.createElement("div")
    let adminBox = document.createElement("div")
    let adminUppdateBoxBtn = document.createElement("button")
    let adminAddBoxBtn = document.createElement("button")
    let adminOfferBoxBtn = document.createElement("button")
    let adminOrderBtn = document.createElement("button")
    let adminUserBtn = document.createElement("button")
    let UserNewsletterBtn = document.createElement("button")

    adminBox.id = "adminProductBox"
    adminUppdateBoxBtn.className = "adminProductBoxBtn"
    adminAddBoxBtn.className = "adminProductBoxBtn"
    adminOfferBoxBtn.className = "adminProductBoxBtn"
    adminOrderBtn.className = "adminProductBoxBtn"
    adminUserBtn.className = "adminProductBoxBtn"
    UserNewsletterBtn.className = "adminProductBoxBtn"
    
    adminUppdateBoxBtn.innerText = "Update"
    adminAddBoxBtn.innerText = "Add"
    adminOfferBoxBtn.innerText = "Offers"
    adminOrderBtn.innerText = "Mark Order"
    adminUserBtn.innerText = "User Admin"
    UserNewsletterBtn.innerText = "User Newsletter"

    adminProductWrapp.append(adminUppdateBoxBtn, adminAddBoxBtn, adminOfferBoxBtn, adminOrderBtn, adminUserBtn, UserNewsletterBtn, adminBox)

    adminUpdateProductPanel() 
 
    adminAddBoxBtn.addEventListener("click", () => {
        adminBox.innerHTML = ""
        adminAddProductPanel()
    })

    adminUppdateBoxBtn.addEventListener("click", () => {
        adminUpdateProductPanel()
    })

    adminOfferBoxBtn.addEventListener("click", () => {
        adminOfferPanel()

    })
    adminOrderBtn.addEventListener("click", () => {
        loadOrders() 
    })
    
    adminUserBtn.addEventListener("click", () => {
        loadUsers()
    })
    
    UserNewsletterBtn.addEventListener("click", () => {
        loadNewsletterSigns()
    })

    return adminProductWrapp
}

/*****       ADMIN DASH FOR PRODUCTS     *****/        

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
    buttonDiv.className = "firstButtonDivStyle"
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
        //Elements
        let newRow = document.createElement("tr")
        newRow.className="UpdatePanelProdRow"
        let productId = document.createElement("td")
        let productName = document.createElement("td")
        let productPrice = document.createElement("td")
        let productDesc = document.createElement("td")
        let productInStock = document.createElement("td")
        let productCategory = document.createElement("td")

        let buttonDiv = document.createElement("div")
        buttonDiv.className = "firstButtonDivStyle"
        let buttonTd = document.createElement("td")
        let editBtnTd = document.createElement("td")
        let deleteBtn = document.createElement("button")
        let editBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        editBtn.innerText = "Edit"

        deleteBtn.addEventListener("click", deleteProduct.bind(product))
        editBtn.addEventListener("click", editProduct.bind(product))
        //Innertext
        productId.innerText = product.productId
        productName.innerText = product.name
        productPrice.innerText = product.price
        productDesc.innerText = product.description
        productInStock.innerText = product.unitsInStock
        productCategory.innerText = product.categoryId
        //Apends

        buttonDiv.append(editBtn, deleteBtn)
        buttonTd.append(buttonDiv)
        newRow.append(productId, productName, productPrice, productDesc, productInStock, productCategory, buttonTd)
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
    } 
    
}

//Creating popUp for editing products
async function editProduct() {
    
    let adminProductBox = document.getElementById("adminProductBox")
    let title = document.createElement("h2")
    let backgroundPopup = document.createElement("div")
    let popUpDiv = document.createElement("div")
    let nameInput = document.createElement("input")
    let priceInput = document.createElement("input")
    let descInput = document.createElement("input")
    let inStockInput = document.createElement("input")
    let categoryInput = await createCategoryDropDown()
    let buttonDiv = document.createElement("div")
    let updateBtn = document.createElement("button")
    let cancelBtn = document.createElement("button")

    backgroundPopup.className = "backgroundPopup"
    backgroundPopup.style.display = "block";
    popUpDiv.id = "editPopUpDiv"
    nameInput.className = "editPopUpInput"
    priceInput.className = "editPopUpInput"
    descInput.className = "editPopUpInput"
    inStockInput.className = "editPopUpInput"
    categoryInput.id = "editPopUpCategory"
    buttonDiv.className = "secondButtonDivStyle"
    
    title.innerText = this.name
    nameInput.placeholder = this.name
    priceInput.placeholder = this.price
    descInput.placeholder = this.description
    inStockInput.placeholder = this.unitsInStock
    updateBtn.innerText="update"
    cancelBtn.innerText = "cancel"
    
    nameInput.type = "text"
    priceInput.type = "number"
    descInput.type = "text"
    inStockInput.type = "number"

    updateBtn.addEventListener("click", update.bind(this))//Alternativ lösning för att gå runt att funktionen kallas vid init    
    cancelBtn.addEventListener("click", cancel)           //==.onclick = () => { update(this.productId); }; okej eller dödssynd?

    buttonDiv.append(updateBtn, cancelBtn)
    popUpDiv.append(title, nameInput, priceInput, descInput, inStockInput, categoryInput, buttonDiv)
    backgroundPopup.append(popUpDiv)
    adminProductBox.append(backgroundPopup)
    windowOnClick(backgroundPopup)
}
async function windowOnClick(backgroundPopup){
    // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == backgroundPopup) {
                backgroundPopup.style.display = "none";
            }
        }
    }

//Close popup window
function cancel() {
    removeElementById("editPopUpDiv")
}

//Function for updateing products in DB
async function update() {
    //Med .bind lösning blir denna "this.productId"
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
  
    removeElementById("editPopUpDiv")
    adminUpdateProductPanel()

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
}


/*****       ADMIN DASH FOR OFFERS     *****/

async function adminOfferPanel() {
    let allProducts = await getAllProducts() 
    let adminBox = document.getElementById("adminProductBox")
    let productWrapper = document.getElementById("adminProductWrapp")
    adminBox.innerHTML = ""
  
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    let productIdTitleTd = document.createElement("td")
    let productNameTitleTd = document.createElement("td")
    let productPriceTitleTd = document.createElement("td")
    let productInStockTitleTd = document.createElement("td")
    let quantityTitleTd = document.createElement("td")
    let addToOfferTitleTd = document.createElement("td")
    let offerName = document.createElement("input")
    let offerDiscount = document.createElement("input")

    titleTr.className="updatePanalTitleRow"
    productIdTitleTd.innerHTML = "<h3>Id</h3>"
    productNameTitleTd.innerHTML = "<h3>Name</h3>"
    productPriceTitleTd.innerHTML = "<h3>Price</h3>"
    productInStockTitleTd.innerHTML = "<h3>In Stock</h3>"
    quantityTitleTd.innerHTML = "<h3>Quantity</h3>"
    addToOfferTitleTd.innerHTML = "<h3>add to offer</h3>"
    offerName.type = "text"
    offerName.placeholder = "Offer name"
    offerDiscount.type = "number"
    offerDiscount.placeholder = "Discount"

    let optionDiv = document.createElement("div")
    let offerButtonDiv = document.createElement("div")
    let confirmDiv = document.createElement("div")
    confirmDiv.id = "offerConfirmDiv"
    offerButtonDiv.className = "secondButtonDivStyle"    
    offerName.id = "newOfferName"
    offerDiscount.id = "offerDiscount"
    let addToOfferBtn = document.createElement("button")
/*     let editOfferBtn = document.createElement("button")
 */    let confirmBtn = document.createElement("button")

/*     editOfferBtn.addEventListener("click", adminEditOfferPanel)
 */
   confirmBtn.addEventListener("click", addProductsToOffer)                                /* WORKING HERE!!!! */
    
    addToOfferBtn.innerText = "Add products to offer"
/*     editOfferBtn.innerText = "Edit Offer"
 */    confirmBtn.innerText = "Create Offer"


    confirmDiv.append(confirmBtn, offerDiscount, offerName)
    offerButtonDiv.append(addToOfferBtn, /* editOfferBtn */)
    optionDiv.append(offerButtonDiv)
    titleTr.append(productIdTitleTd, productNameTitleTd, productPriceTitleTd, productInStockTitleTd, quantityTitleTd, addToOfferTitleTd)
    myTable.append(titleTr)
    adminBox.append(optionDiv, myTable, confirmDiv)

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
        let quantityTd = document.createElement("td")                                         //Här är quantity för offers
        let quantity = document.createElement("input")    
        
        checkBox.className = "offerCheck"
        checkBox.type = "checkbox"
        checkBox.style.width = "5vw"
        checkBox.style.height = "5vh" 
        checkBox.value = product.productId
        quantity.type = "number"
        quantity.width = "20px"
        quantity.id = "offerQuantity"
        //Innertext
        quantityTd.append(quantity)
        addToOffer.append(checkBox)
        productId.innerText = product.productId
        productName.innerText = product.name
        productPrice.innerText = product.price
        productInStock.innerText = product.unitsInStock
        //Apends

        newRow.append(productId, productName, productPrice, productInStock, quantityTd, addToOffer)
        myTable.appendChild(newRow)
    })    
    
}


//Panel for Edeting offers      Blev inte klar då hela offers blev omgjord i sista minut
/*  async function adminEditOfferPanel(value) {
    let allOffers = await getAllOffers() 
    let adminBox = document.getElementById("adminProductBox")
    let myTable = document.createElement("table")
    
    adminBox.innerHTML = ""
    myTable.id = "offerTable"
    
    let optionDiv = document.createElement("div")
    let offerDropDown = await createOfferDropDown()
    offerDropDown.class = "selectOffer"
    offerDropDown.addEventListener("change", dropDownValue.bind(offerDropDown))             // WORKIGN HERE


    let offerButtonDiv = document.createElement("div")
    let createOfferBtn = document.createElement("button")
    let addToOfferBtn = document.createElement("button")
    let editOfferBtn = document.createElement("button")

    addToOfferBtn.addEventListener("click", adminOfferPanel)
    //createOfferBtn.addEventListener("click", adminCreateOfferPanel)

    createOfferBtn.innerText = "Create Offer"
    addToOfferBtn.innerText = "Add to offer"
    editOfferBtn.innerText = "Edit Offer"


    offerButtonDiv.append(addToOfferBtn, createOfferBtn, editOfferBtn)
    optionDiv.append(offerDropDown, offerButtonDiv)
    adminBox.append(optionDiv, myTable)

    renderEditOfferTable(offerDropDown.value)                                                      //MÅÅÅÅÅÅÅSSTEEE FIIIIXAAAA EDIT RENDER
} 

async function dropDownValue() {
    let sortedByOffer = await getAllProdsInOffer(this.value)
    renderEditOfferTable(this.value) 
}

//Skriver ut alla produkter från valt Offer med checkboxar
async function renderEditOfferTable(offerName) {                                                                                  //JOBBA HÄÄÄÄÄÄÄÄÄÄÄÄÄR
    let sortedByOffer = await getAllProdsInOffer(offerName)
    let adminBox = document.getElementById("adminProductBox")
    let myTable = document.getElementById("offerTable")
    let buttonDiv = document.createElement("div")
    myTable.innerHTML = ""

    let titleTr = document.createElement("tr")
    let productNameTitleTd = document.createElement("td")
    let productPriceTitleTd = document.createElement("td")
    let productInStockTitleTd = document.createElement("td")
    let addToOfferTitleTd = document.createElement("td")
    let removeFromOfferBtn = document.createElement("button")
    let removeOfferBtn = document.createElement("button")
    
    removeFromOfferBtn.addEventListener("click", removeProductsFromOffer.bind(sortedByOffer))
    removeOfferBtn.addEventListener("click", removeOffer.bind(offerName))

    titleTr.className="updatePanalTitleRow"
    productNameTitleTd.innerHTML = "<h3>Name</h3>"
    productPriceTitleTd.innerHTML = "<h3>Price</h3>"
    productInStockTitleTd.innerHTML = "<h3>In Stock</h3>"
    addToOfferTitleTd.innerHTML = "<h3>add to offer</h3>"
    removeFromOfferBtn.innerText = "Remove from offer"
    removeOfferBtn.innerText = "Remove offer"
    
    buttonDiv.append(removeFromOfferBtn, removeOfferBtn)
    titleTr.append(productNameTitleTd, productPriceTitleTd, productInStockTitleTd, addToOfferTitleTd)
    myTable.append(titleTr)
    adminBox.append(myTable)
    sortedByOffer.forEach(product => { 
        //every Td
        let newRow = document.createElement("tr")
        newRow.className="UpdatePanelProdRow"
        let productName = document.createElement("td")
        let productPrice = document.createElement("td")
        let productInStock = document.createElement("td")
        let addToOffer = document.createElement("td")          
        let checkBox = document.createElement("input")
        checkBox.className = "offerCheck"
        checkBox.type = "checkbox"
        checkBox.style.width = "5vw"
        checkBox.style.height = "5vh" 
        checkBox.value = product.productId
        //Innertext
        addToOffer.append(checkBox)
        productName.innerText = product.name
        productPrice.innerText = product.price
        productInStock.innerText = product.unitsInStock
        //Apends
        newRow.append(productName, productPrice, productInStock, addToOffer)
        myTable.appendChild(newRow)
    }) 
    myTable.append(buttonDiv)
}
 */

async function addProductsToOffer() {                                                                               //WORKING HEEEEERE
    let offerCheck = document.getElementsByClassName("offerCheck")
    let checkedArray = []
    let quantity = document.getElementById("offerQuantity")
    let offerName = document.getElementById("newOfferName").value
    let offerDiscount = document.getElementById("offerDiscount").value

    for (let i = 0; i < offerCheck.length; i++) {
        if(offerCheck[i].checked) {
            let checkAndQuantity = {
                checked: offerCheck[i].value,
                quantity: offerQuantity[i].value                                         //Varför funkar denna?
            }
            checkedArray.push(checkAndQuantity)
        }
    } 
    let body = new FormData()
    body.set("offerCheck", JSON.stringify(checkedArray))
    body.set("newOfferName", JSON.stringify(offerName))
    body.set("offerDiscount", JSON.stringify(offerDiscount))
   
    const response = await makeReq("./api/recievers/offerReciever.php", "POST", body)  
}

async function removeProductsFromOffer() {
    let offerCheck = document.getElementsByClassName("offerCheck")
    let checkedArray = []

    for (let i = 0; i < offerCheck.length; i++) {
        if(offerCheck[i].checked) {
            checkedArray.push(offerCheck[i].value)
        }
    }

    let body = new FormData()
    body.set("removeOfferCheck", JSON.stringify(checkedArray))

    const response = await makeReq("./api/recievers/offerReciever.php", "POST", body)
    renderEditOfferTable(this[0].offerId)
}

async function removeOffer() {
                                                                                                        //WORKING HERE
    if (confirm("are you sure you want to delete offer with ID = " + this + " from products?")) {        
        let data = new FormData()
        data.append("removeOffer", JSON.stringify(this))
        const response = await makeReq("./api/recievers/offerReciever.php", "POST", data)
        adminEditOfferPanel()

    }
}

/*****       ADMIN DASH FOR ORDERS    *****/

async function getOrders() {
    const response = await makeReq("./api/recievers/orderReciever.php", "GET")
    return response
}

// Hämtar å visar ordrarna i adminpanel.
async function loadOrders() {
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
    let header = document.createElement("h1")
    header.align = "center"
    header.innerText = "Mark orders as shipped"
    let searchInput = document.createElement("input")
    searchInput.placeholder = "Search for orders by orderId"
    searchInput.style.marginBottom = "5px"
    let btn = document.createElement("button")
    btn.style.height = "3vh"
    btn.innerText = "Search"   
    adminProductBox.append(header, searchInput, btn)
  
    //hämtar ordrar
    let getAllOrders = await getOrders() 

    //skapar table med titlar.
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    titleTr.align = "center"
    let orderIdTitle = document.createElement("td")
    let userIdTitle = document.createElement("td")
    let orderDateTitle = document.createElement("td")
    let shippedTitle = document.createElement("td")
    // confirm knapp
    let confirmBtn = document.createElement("button")
    confirmBtn.addEventListener("click", updateShippingStatus)
    confirmBtn.style.height = "5vh"
    confirmBtn.innerText = "Apply changes, mark order(s) as shipped"  

    orderIdTitle.innerHTML = "<h3>OrderId</h3>"
    userIdTitle.innerHTML = "<h3>UserId</h3>"
    orderDateTitle.innerHTML = "<h3>Order Date</h3>"
    shippedTitle.innerHTML = "<h3>Shipped</h3>"
    
    titleTr.append(orderIdTitle, userIdTitle, orderDateTitle, shippedTitle)
    myTable.append(titleTr)
    adminBox.append(myTable, confirmBtn)

    getAllOrders.forEach(order => {
        
        if(order.shipped == null) {

        let newRow = document.createElement("tr")
        newRow.align = "center"
        let orderId = document.createElement("td")
        let userId = document.createElement("td")
        let orderDate = document.createElement("td")
        let shipped = document.createElement("td")
        let checkbox = document.createElement("input")
        checkbox.className = "myCheckbox"
        checkbox.type = "checkbox"
        checkbox.style.width = "5vw"
        checkbox.style.height = "5vh"
        checkbox.value = order.orderId
        

        orderId.innerText = order.orderId
        userId.innerText = order.userId
        orderDate.innerText = order.orderDate
    
        shipped.append(checkbox)
        newRow.append(orderId, userId, orderDate, shipped)
        myTable.append(newRow)
        }
        
    })  
}

//Funktion som skickar upp array med checkbox value
async function updateShippingStatus() {
    let cb = document.getElementsByClassName("myCheckbox")
    let myArray = []
    for (let i = 0; i < cb.length; i++) {
        if(cb[i].checked) { 
            myArray.push(cb[i].value)           
         }
    }       

    let body = new FormData()
    body.set("cbArray", JSON.stringify(myArray))     
    body.set("action", "loadAdminOrder")     
    
    const response = await makeReq("./api/recievers/orderReciever.php", "POST", body)
    loadOrders()
    return response 
}

/*****       ADMIN DASH FOR MAKE ADMIN    *****/

//Hämta användare
async function getUsers() {
    const response = await makeReq("./api/recievers/userReciever.php?getUsers", "GET")
    return response
}
//laddar panel med alla användare
async function loadUsers() {
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
    let header = document.createElement("h1")
    header.align = "center"
    header.innerText = "Update admin permissions"
    let searchInput = document.createElement("input")
    searchInput.placeholder = "Search for user by username"
    searchInput.style.marginBottom = "5px"
    let btn = document.createElement("button")
    btn.style.height = "3vh"
    btn.innerText = "Search"   
    adminProductBox.append(header, searchInput, btn)
  
    //hämtar ordrar
    let getAllUsers = await getUsers() 

    //skapar table med titlar.
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    titleTr.align = "center"
    let userIdTitle = document.createElement("td")
    let usernameTitle = document.createElement("td")
    let isAdminTitle = document.createElement("td")
    let changeTitle = document.createElement("td")

    // confirm knapp
    let confirmBtn = document.createElement("button")
    confirmBtn.addEventListener("click", updateUserStatus)
    confirmBtn.style.height = "5vh"
    confirmBtn.innerText = "Apply changes"  

    userIdTitle.innerHTML = "<h3>userId</h3>"
    usernameTitle.innerHTML = "<h3>Username</h3>"
    isAdminTitle.innerHTML = "<h3>is Admin</h3>"
    changeTitle.innerHTML = "<h3>Permission</h3>"
    
    titleTr.append(userIdTitle, usernameTitle, isAdminTitle, changeTitle)
    myTable.append(titleTr)
    adminBox.append(myTable, confirmBtn)

    getAllUsers.forEach(user => {
        
        let newRow = document.createElement("tr")
        newRow.align = "center"
        let userId = document.createElement("td")
        let username = document.createElement("td")
        let isAdmin = document.createElement("td")
        let cb = document.createElement("td")
    
        let checkbox = document.createElement("input")
        checkbox.className = "myCheckbox2"
        checkbox.type = "checkbox"
        checkbox.style.width = "5vw"
        checkbox.style.height = "5vh"
        checkbox.value = user.userName
    
        userId.innerText = user.userId
        username.innerText = user.userName
        isAdmin.innerText = user.isAdmin

        if(user.isAdmin == "1") { //Checkbox är checkad om användare är admin. 
            checkbox.checked = true
        }
     
        newRow.append(userId, username, isAdmin, cb)
        cb.append(checkbox)
        myTable.append(newRow)
        
    })  
}

//Skickar upp isAdmin värden från checkbox.
async function updateUserStatus() {
    let cb = document.getElementsByClassName("myCheckbox2")
    let checkedArr = []
    let notCheckedArr = []
    for (let i = 0; i < cb.length; i++) {
        if(cb[i].checked) { 
            checkedArr.push(cb[i].value)           
        }
         else if(!cb[i].checked) {
            notCheckedArr.push(cb[i].value)
         }
    }       


    let body = new FormData()
    body.set("checkedArr", JSON.stringify(checkedArr))
    body.set("notCheckedArr", JSON.stringify(notCheckedArr))
    body.set("action", "updateUser")        

  
  
    const response = await makeReq("./api/recievers/userReciever.php", "POST", body)
    loadUsers()
    return response 
}
// funktion som listar nyhetsbrev subscribers
async function getUserNewsletters() {
    const response = await makeReq("./api/recievers/userReciever.php?getNewsletter", "GET")
    return response
}

async function loadNewsletterSigns() {
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
    let header = document.createElement("h1")
    header.align = "center"
    header.innerText = "Users signed up for newsletter"
    adminProductBox.append(header)
  
    //hämtar ordrar
    let getNews = await getUserNewsletters() 

    //skapar table med titlar.
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    titleTr.align = "center"
    let nameTitle = document.createElement("td")
    let EmailTitle = document.createElement("td")
   
    nameTitle.innerHTML = "<h3>Name</h3>"
    EmailTitle.innerHTML = "<h3>Email</h3>"
   
    
    titleTr.append(nameTitle, EmailTitle)
    myTable.append(titleTr)
    adminBox.append(myTable)

    getNews.forEach(user => {
      
        for (let i = 0; i < user.length; i++) {
            let newRow = document.createElement("tr")
            newRow.align = "center"
            let name = document.createElement("td")
            let email = document.createElement("td")
            email.innerText = user[i].email
            name.innerText = user[i].name
            newRow.append(name, email)
            myTable.append(newRow)
        }
      
    })  
}